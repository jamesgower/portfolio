import _ from "lodash";
import Path from "path-parser";
import { URL } from "url";
import { SurveyMatch, MatchProps, AuthRequest } from "../interfaces/routes.i";
import Mailer from "../services/Mailer";
import surveyTemplate from "../services/emailTemplates/surveyTemplate";

module.exports = (app, requireLogin, requireCredits, mongoose): void => {
  const Survey = mongoose.model("surveys");

  app.get(
    "/api/surveys",
    requireLogin,
    async (req: AuthRequest, res): Promise<void> => {
      const surveys = await Survey.find({ _user: req.user.id }).select({
        recipients: false,
      });

      res.send(surveys);
    },
  );

  app.get("/api/surveys/:surveyId/:choice", (req, res): void => {
    res.send("Thanks for voting!");
  });

  app.delete(
    "/api/surveys/delete/:id",
    async (req, res): Promise<void> => {
      await Survey.findByIdAndRemove(req.params.id, (err): void => {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Deleted!" });
        }
      });
    },
  );

  app.post(
    "/api/surveys/webhooks",
    (req, res): Response => {
      const p = new Path("/api/surveys/:surveyId/:choice");

      _.chain(req.body)
        .map(
          ({ email, url }): SurveyMatch => {
            const match: MatchProps = p.test(new URL(url).pathname);
            if (match) {
              return { email, surveyId: match.surveyId, choice: match.choice };
            }
          },
        )
        .compact()
        .uniqBy("email", "surveyId")
        .each(({ surveyId, email, choice }): void => {
          Survey.updateOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email, responded: false },
              },
            },
            {
              $inc: { [choice]: 1 },
              $set: { "recipients.$.responded": true },
              lastResponded: new Date(),
            },
          ).exec();
        })
        .value();

      return res.send({});
    },
  );

  app.post(
    "/api/surveys",
    requireLogin,
    requireCredits,
    async (req: AuthRequest, res): Promise<void> => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
      });

      // Great place to send an email!
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    },
  );
};

import crypto from "crypto";
import passport from "passport";
import mongoose from "mongoose";

const User = mongoose.model("users");

module.exports = (app): void => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    }),
  );

  app.get("/auth/google/callback", passport.authenticate("google"), (req, res): void => {
    res.redirect("/lets-watch");
  });

  app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email" }));

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res): void => {
      res.redirect("/lets-watch");
    },
  );
  app.get("/auth/github", passport.authenticate("github", { scope: "user" }));

  app.get("/auth/github/callback", passport.authenticate("github"), (req, res): void => {
    res.redirect("/lets-watch");
  });

  app.get("/auth/reddit", (req, res): void => {
    req.session.state = crypto.randomBytes(32).toString("hex");
    const options = { state: req.session.state, duration: "permanent" };
    passport.authenticate("reddit", options)(req, res);
  });

  app.get("/auth/reddit/callback", passport.authenticate("reddit"), (req, res): void => {
    res.redirect("/lets-watch");
  });

  app.get("/api/current_user", (req, res): void => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res): void => {
    req.logout();
    res.redirect("/");
  });

  app.put(
    "/api/add_to_user",
    async (req, res): Promise<void> => {
      const { _id } = req.user;
      const { showID, type } = req.body;
      const user: any = await User.findById(_id);
      if (!user) {
        console.log("No user");
        return res.send({
          ...req.user,
          error: "wrong_user",
        });
      }
      if (user[type].indexOf(showID) === -1) {
        user[type].push(showID);
        user.save();
        return res.send(user);
      }
      // Already in database
      return res.send({
        user,
        error: "duplicate",
      });
    },
  );

  app.patch(
    "/api/remove_from_user",
    async (req, res): Promise<void> => {
      const { _id } = req.user;
      const { showID, type } = req.body;
      const user: any = await User.findById(_id);
      if (!user) {
        console.log("No user");
        return res.send({
          ...req.user,
          error: "wrong_user",
        });
      }
      const index = user[type].indexOf(showID);
      if (index > -1) {
        user[type].splice(index, 1);
        user.save();
        return res.send(user);
      }
      // Not in database
      return res.send({
        user,
        error: "duplicate",
      });
    },
  );
};

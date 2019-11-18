import passport, { Profile } from "passport";
import mongoose from "mongoose";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const RedditStrategy = require("passport-reddit").Strategy;

const User = mongoose.model("users");

passport.serializeUser((user: Profile, done: CallableFunction): void => {
  done(null, user.id);
});

passport.deserializeUser((id, done): void => {
  User.findById(id, (err: Error, user: Profile): void => {
    done(err, user);
  });
});

const URL = process.env.NODE_ENV !== "production" ? "http://localhost:8080" : "";

try {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID_OAUTH,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_OAUTH,
        callbackURL: `${URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done): Promise<void> => {
        const existingUser = await User.findOne({ userID: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await new User({
            userID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          }).save();
          done(null, user);
        }
      },
    ),
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${URL}/auth/facebook/callback`,
        profileFields: ["email", "id", "first_name", "gender", "last_name", "picture"],
      },
      async (accessToken, refreshToken, profile, done): Promise<void> => {
        const existingUser = await User.findOne({ userID: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await new User({
            userID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails?.[0].value,
            image: profile.photos?.[0].value,
          }).save();
          done(null, user);
        }
      },
    ),
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${URL}/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done): Promise<void> => {
        const existingUser = await User.findOne({ userID: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await new User({
            userID: profile.id,
            firstName: profile.displayName,
            email: profile.emails?.[0].value,
            image: profile.photos?.[0].value,
          }).save();
          done(null, user);
        }
      },
    ),
  );

  passport.use(
    new RedditStrategy(
      {
        clientID: process.env.REDDIT_CONSUMER_KEY,
        clientSecret: process.env.REDDIT_CONSUMER_SECRET,
        callbackURL: `${URL}/auth/reddit/callback`,
      },
      async (accessToken, refreshToken, profile, done): Promise<void> => {
        const existingUser = await User.findOne({ userID: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await new User({
            userID: profile.id,
            firstName: profile.name,
            image: profile._json.subreddit?.icon_img,
          }).save();
          done(null, user);
        }
      },
    ),
  );
} catch (e) {
  console.log(e);
}

const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const user = require("./user");

const User = require("./user");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((user, done) => {
    done(null,user)

});

passport.use(
  new TwitterStrategy(
    {
      consumerKey:"dummy app key",
      
      consumerSecret:"dummy app secret",
      userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
      callbackURL: "http://127.0.0.1:4000/auth/twitterLogin/callback"
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel

    console.log(profile);

      const currentUser = await User.findOne({
        email:profile._json.email
      });
    //   // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
         email:profile._json.email
        }).save();
       
        done(null,newUser)
      }
      else{
        done(null,currentUser)
      }
    //console.log(profile._json.email);
    //return done(null,profile)
    }
  )
);
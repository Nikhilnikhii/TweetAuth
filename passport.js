require('dotenv').config();
const passport = require("passport");
const TwitterStrategy = require("passport-twitter");

//const InstagramStrategy=require('passport-instagram');

const GitHubStrategy=require('passport-github2');
//const user = require("./user");

const User = require("./user");

const { TWITTER_APP_KEY,TWITTER_APP_SECRET,INSTAGRAM_APP_ID,INSTAGRAM_APP_SECRET,GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET }=process.env;
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
      consumerKey:TWITTER_APP_KEY,
      
      consumerSecret:TWITTER_APP_SECRET,
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

// passport.use(new InstagramStrategy({
//   clientID: INSTAGRAM_APP_ID,
//   clientSecret: INSTAGRAM_APP_SECRET,
//   callbackURL: "http://127.0.0.1:4000/auth/instagram/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   console.log(profile);
// }
// ));

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  
  callbackURL: "http://127.0.0.1:4000/auth/githubLogin/callback"
},
async function(accessToken, refreshToken, profile, done) {

  console.log(profile);
  console.log(profile._json.email);
  
  if(profile._json.email==null)
  {
    console.log("please add email address to your github account and try logging in with us bcoz email is a mandatory field");
    console.log("already added please make eail address public in github account");
  }
  else{
    const currentUser=await User.findOne({email:profile._json.email})
    if(currentUser){
      done(null,currentUser)
    }
    else{
      const newUser=await User.create({email:profile._json.email,name:profile._json.login})

      done(null,newUser)
    }
  }

  //done(null,profile)
}
));
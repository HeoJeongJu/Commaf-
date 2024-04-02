const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../admin/model');


passport.serializeUser((admin, done) => {
    done(null, admin.id);
});

passport.deserializeUser(async(req, id, done) => {
    try {
        const admin = await Admin.findOne({ id: id });
        done(null, admin);
    } catch(err) {
        done(err, null);
    }   
});

passport.use(new LocalStrategy({
    session: true,
    usernameField: 'id',
    passwordField: 'password'
    }, async (id, password, done) => {
        try {
            const admin = await Admin.findOne({ id: id });

            if(!admin) return done(null, false, { message: '옳지 않은 아이디입니다.'});

            const isMatch = await admin.comparePassword(password);
            if(isMatch) return done(null, admin);
            
            else return done(null, false, { message: '비밀번호가 틀렸습니다.'}); 

        } catch(err) {
            return done(err);
        }
    }
));

module.exports = passport;
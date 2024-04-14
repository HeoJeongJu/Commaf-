const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const svc = require('../admin/service');


passport.serializeUser((admin, done) => {
    // 6. req.session에 사용자 아이디 키 값 저장
    done(null, admin.id);
});

// 모든 요청시 항상 실행되는 미들웨어
passport.deserializeUser(async(req, id, done) => {
    try {
        // 7. 세션 저장소에 사용자 아이디가 있다면 DB를 조회하여 req.admin에 정보를 삽입
        const admin = await svc._getAdmin(id);
        done(null, admin);
    } catch(err) {
        done(err, null);
    }   
});

// 2. passport.use 호출
passport.use(new LocalStrategy({
    session: true,
    usernameField: 'id',
    passwordField: 'password'
    }, async (id, password, done) => {
        // 3. 로그인 전략 실행 후 done()을 호출하면 다시 돌아가 다음 미들웨어 실행
        try {
            const admin = await svc._getAdmin(id);

            if(!admin) return done(null, false, { message: '옳지 않은 아이디입니다.'});

            const isMatch = await svc._comparePassword(password, admin.password);
            if(isMatch) return done(null, admin); 
            
            else return done(null, false, { message: '비밀번호가 틀렸습니다.'}); 

        } catch(err) {
            return done(err);
        }
    }
));

module.exports = passport;
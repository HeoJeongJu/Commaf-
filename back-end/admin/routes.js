const express = require('express');;
const passport = require('../passport/index');
const router = express.Router();
const login_required = require('../middlewares/login-required');

router.post('/login', login_required.isNotLogin, (req, res, next) => {
    passport.authenticate('local', (err, admin, info) => {
    if(err) {
        console.error(err);
        return next(err);
    }
    if(!admin) {
        return res.redirect(info.message);
    }
    return req.login(admin, (err) => {
        if(err) {
            console.error(err);
            return next(err);
        }

        return res.status(200).send(admin);
    });
    }) (req, res, next);
});


router.get('/logout', login_required.isLogin, (req, res, next) => {
    req.logout((err) => {
        req.session.destroy();
        if(err) {
            console.error(err);
        } else {
            res.status(200).send("로그아웃 완료");
        }
    })
});

router.get('/status', (req, res, next) => {
    if (req.isAuthenticated()) { 
        res.json({ isLogin: true });
  } else {
        res.json({ isLogin: false });
  }
});


module.exports = router;
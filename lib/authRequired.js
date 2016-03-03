/**
 * Created by MaoX on 2016/3/2.
 */

module.exports = function(role){
    role = role || 0;

    return function(req,res,next){
        var _user = req.session.user;
        if(!_user){
            var err = new Error('未登录');
            err.status = 401;
            return next(err);
        }
        if(!_user.role  || _user.role <role){
            var err= new Error('没有足够权限');
            err.status = 400;
            return next(err);
        }
        next();
    }
};
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

export const authenticateJwt = (req, res, next) =>
 passport.authenticate("jwt", {session:false}, (err, user) => {
    if(user){
        req.user = user;
    }else{
    }    
    next();//다음 미들웨어 함수에 제어를 전달/ 이렇게 하지 않으면 요청은 정지된채로 있는다. 
 })(req, res, next); 

const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({id:payload.id});
        if(user !== null){
            //user쿼리에서 해당아이다값으로 값을 찾지못하면 null을 반환한다.(콘솔에서 확인) -> null이 아니면 값을 받은 것.
            return done(null,user);//err값은 null이고 user를 반환한다.
        }else{
            return done(null,false);//err값은 null이고 user에 값을 받지 못해서 false를 반환한다.
        }
    } catch (err){
        return done(err, false);
    }
}

//인자로 jwtOptions를 주고 콜백함수에서 jwtOptions를 해석한 값을 받아서 처리한다.
passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

//jwt나 쿠키에서 정보를 받아와 express request할 때 같이 보낸다.
//strategy에 option을 인자로 주면 함수에서 결과값으로 payload를 준다. 콜백함수에서 payload를 받아서 처리.
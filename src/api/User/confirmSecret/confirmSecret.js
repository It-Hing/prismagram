import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default{
    Mutation: {
        confirmSecret: async(_,args) => {
            const {email, secret} = args;
            const user = await prisma.user({email});
            if(user.loginSecret === secret){
                return generateToken(user.id);
            }else{
                //console.log(user);
                //console.log(user.loginSecret, secret);
                throw Error("Wrong email/secret combination");
            }
        }
    }
}

//함수의 반환값은 jwt토큰 값이다. 모든 입력값은 개수에 상관없이 args로 들어온다. 
//jwt를 통해 토큰을 생성하면 그것을 해석하기위해서 passport가 필요하다.
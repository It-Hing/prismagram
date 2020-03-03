import { generateSecret } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
import { emit } from "nodemon";

export default{
    Mutation:{
        requestSecret: async(_, args, {request}) =>{
            console.log(request);

            const {email} = args;
            const loginSecret = generateSecret();
            console.log(loginSecret);
            try {
                throw Error();
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data:{loginSecret}, where:{email:email}});
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        }
    }
}
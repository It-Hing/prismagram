import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation: {
        createAccount: async(_,args) => {
            const {username, email, firstName = "", lastName = "", bio = ""} = args;
            const user = await prisma.createUser({
                username,
                email,
                firstName,
                lastName, 
                bio
            });

            return user;
        }
    }
}

//username, email을 제외한 값은 들어오지않을 수 있어서 기본값으로 텅빈스트링값을 준다.
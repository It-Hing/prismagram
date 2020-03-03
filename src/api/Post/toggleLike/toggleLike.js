import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        toggleLike: async(_, args, {request}) => {
            isAuthenticated(request);//request를 만족하는 user가없으면 err를 뱉어냄.
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
                AND: [
                    {
                        user:{
                            id:user.id
                        }
                    },
                    {
                        post:{
                            id:postId
                        }
                    }
                ]
            };
            try {
                const existingLike = await prisma.$exists.like(filterOptions);
                if(existingLike){
                    await prisma.deleteManyLikes(filterOptions);
                    //like를 얻는 것과 지우는 것은 동일한 것이다.
                }else{
                    await prisma.createLike({
                        user:{
                            connect:{
                                id: user.id
                            }
                        },
                        post:{
                            connect:{
                                id: postId
                            }
                        }
                    })
                }
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}
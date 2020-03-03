require("dotenv").config();
//config에 필요한 환경변수들이 담겨있다. 필요할 때 불러와서 사용
import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.resolve(__dirname, ".env")});
import "./env";

import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import passport from "passport";//passport모듈
import schema from "./schema";
import "./passport";//js파일
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

//console.log(process.env);

//sendSecretMail("ty7gh@naver.com","Hello Naver!");

const server = new GraphQLServer({
    schema, 
    context: ( {request} ) => ( {request} )//context는 graphql끼리 공유하는 데이터
});
//서버 객체를 생성할 때 두가지 방법
//1.type 과 resolver를 인자로 주는 방법
//2.schema를 인자로 주는방법

server.express.use(logger("dev"));
//graphql에 내장되어 있는 express에 logger를 추가해준다.
//logger가 있어야 로그기록을 해준다.
//미들웨어 추가
server.express.use(authenticateJwt);

server.start({port:PORT},() => 
    console.log(`✅Server Running on http://localhost:${PORT}`),
);
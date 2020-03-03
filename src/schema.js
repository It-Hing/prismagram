import {makeExecutableSchema} from "graphql-tools";
import {fileLoader, mergeResolvers, mergeTypes} from "merge-graphql-schemas";
import path from "path";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "api/**/*.js")) ;

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;

//모든 타입과 리솔버를 모아서 스키마 객체에 담는다.
//exports default 는 분리되어 있는 파일 내 내보낼 하나의 고정된 값만 내보낼 때 사용(javascript의 모듈화)

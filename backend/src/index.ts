import { PostResolver } from "./resolvers/post";
import mikroConfig from "./mikro-orm.config";
import { MikroORM } from "@mikro-orm/core";
import { __is_prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
// import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  // const post = orm.em.create(Post, { title: "my second post" });
  // await orm.em.persistAndFlush(post);
  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("express server listening");
  });
};

console.log("Hello World! This is the backend");
main().catch((err) => {
  console.log("ERROR MAIN()");
  console.log(err);
});

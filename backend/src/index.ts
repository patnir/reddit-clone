import mikroConfig from "./mikro-orm.config";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { __is_prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  const post = orm.em.create(Post, { title: "my first post" });
  await orm.em.persistAndFlush(post);
};

console.log("Hello World! This is the backend");
main().catch((err) => {
  console.log("ERROR MAIN()");
  console.log(err);
});

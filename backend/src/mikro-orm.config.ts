import { MikroORM } from "@mikro-orm/core";
import { __is_prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";

console.log(__dirname);
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  user: "test",
  dbName: "redditclone",
  type: "postgresql",
  debug: !__is_prod__,
} as Parameters<typeof MikroORM.init>[0];

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/users.model";
import { TelegrafModule } from "nestjs-telegraf";
import * as LocalSessions from "telegraf-session-local";
import { AppUpdate } from "./app.update";
import { Posts } from "./users/models/posts.model";

const sessions = new LocalSessions({database: 'sessions-db.json'})
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: "6219075080:AAE_Ca2Csr4Y4BQ1N3H8fAj_1keAvrZyyUA"
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGHOST,
      port: +process.env.PGPORT,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      ssl: false,
      models: [Users, Posts],
      autoLoadModels: true
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [AppUpdate]
})
export class AppModule {}

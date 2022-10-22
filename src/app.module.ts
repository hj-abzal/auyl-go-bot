import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/users.model";
import { TelegrafModule } from "nestjs-telegraf";
import * as LocalSessions from "telegraf-session-local";
import { AppUpdate } from "./app.update";

const sessions = new LocalSessions({database: 'sessions-db.json'})
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }),
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: process.env.TG_TOKEN
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      ssl: false,
      models: [Users],
      autoLoadModels: true
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [AppUpdate]
})
export class AppModule {}

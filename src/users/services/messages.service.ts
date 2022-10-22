import { Injectable } from "@nestjs/common";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { Users } from "../models/users.model";

@Injectable()
export class MessagesService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>
  ) {
  }

  async sendMessage(message: string, users: Users[]): Promise<Users[]> {
    try {
      users.map( async (u) => {
        await this.bot.telegram.sendMessage(u.telegram_id, message);
      });
      return users;
    } catch (e) {
      return e
    }
  }
}

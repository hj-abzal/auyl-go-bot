import { Ctx, InjectBot, Message, On, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { v1 } from "uuid";
import { UsersService } from "./users/services/users.service";

interface IContext extends Context {
  session: {
    type: "register" | null,
    token: string
  };
}

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<IContext>,
    private userService: UsersService
  ) {
  }

  @Start()
  async sayHello(ctx: IContext) {
    console.log(ctx);
    console.log('fdjflkd');
    try {
      const allUsers = await this.userService.getAll({telegram_id: ctx.from.id.toString()})
      allUsers.length ? await this.sendZoomLink(ctx) : await this.sendRegistrationToken(ctx);
    } catch (e) {
      ctx.telegram.sendMessage("1071927152", e);
    }
  }

  @On("text")
  async confirmRegister(@Message("text") message: string, @Ctx() ctx: IContext) {
    if (ctx.session?.type !== "register") return;
    if (message === ctx.session.token) {
      try {
        await this.userService.create({
          name: ctx.from.first_name,
          telegram_id: ctx.from.id.toString(),
          telegram_user_name: ctx.from.username,
          group: 2
        });
        await ctx.reply(`Успешно зарегистрирован!`);
      } catch (e) {
        await ctx.reply(`Что то пошло не так!`);
      }
    } else {
      await ctx.reply("Не валидный токен!");
    }
    ctx.session.type = null;
    ctx.session.token = "";
  }

  async sendZoomLink(ctx: IContext) {
    await ctx.reply(`https://zoom.us/j/2893885232?pwd=UC8yUTRnMDh4NDd5YmVZb2hFNEFzZz09`);
  }

  async sendRegistrationToken(ctx: IContext) {
    const token = v1();
    ctx.session.type = "register";
    ctx.session.token = token;
    await ctx.reply("Отправил сенсею @SuanAbzal токен, отправь следующим сообщением данный токен:");
    await ctx.telegram.sendMessage("1071927152", token);
    await ctx.telegram.sendMessage("1071927152", JSON.stringify(ctx.from));
  }
}
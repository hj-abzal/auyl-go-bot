import { Ctx, InjectBot, Message, On, Start, Update } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { v1 } from "uuid";
import { UsersService } from "./users/services/users.service";

interface IContext extends Context {
  session: {
    type: "create_post" | "start_message" | "register" | "delete_post"
    token: string,
    group: number
  };
}

@Update()
export class AppUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<IContext>,
    private userService: UsersService,
  ) {
  }

  @Start()
  async sayHello(ctx: IContext) {
    try {
      const allUsers = await this.userService.getAll({ telegram_id: ctx.from.id.toString() });
      if (allUsers.length) {
        ctx.session.type = "start_message";
        ctx.telegram.sendMessage(ctx.from.id.toString(), `
        Барлық посттарды қарау үшін 0 жіберіңіз,
Пост жазу үшін 1 жіберіңіз,
Постты өшіру үшін 2 жіберіңіз,
        `);
      } else {
        await this.sendRegistrationToken(ctx);
      }
    } catch (e) {
      ctx.telegram.sendMessage("1071927152", e);
    }
  }

  @On("text")
  async confirmRegister(@Message("text") message: string, @Ctx() ctx: IContext) {

    if (ctx.session?.type === "start_message") {

      if (message === "0") {
        const allUsers = await this.userService.getAll({ telegram_id: ctx.from.id.toString() });
        const allPosts = await this.userService.getAllPosts(allUsers[0].id);
        if (allPosts.length) {
          allPosts.forEach((post) => {
            ctx.telegram.sendMessage(ctx.from.id.toString(), `Пост id:${post.id}, Teкст: ${post.text}`);
          });
        } else {
          return ctx.telegram.sendMessage(ctx.from.id.toString(), "Постар жоқ");
        }
        return;
      }
      if (message === "1") {
        ctx.session.type = "create_post";
        return ctx.reply("Постты жазыңыз:");

      }
      if (message === "2") {
        ctx.session.type = "delete_post";

        return ctx.reply("Посстың id осында жіберіңіз:");

      }
      ctx.session.type = null;
      return ctx.reply("Қате жазылды!");
    }

    if (ctx.session?.type === "create_post") {
        try {

          const allUsers = await this.userService.getAll({ telegram_id: ctx.from.id.toString() });

          await this.userService.createPost({
            text: message,
            user_id: allUsers[0].id
          });
          await ctx.reply("Пост жазылды!");
          ctx.session.type = null;
        } catch (e) {

        }
    }

    if (ctx.session?.type === "delete_post") {
      try {
        await this.userService.deletePost(Number(message));

        await ctx.reply("Пост өшірілді!");
        ctx.session.type = null;
      } catch (e) {

      }
    }


    if (ctx.session?.type !== "register") return;
    if (message === ctx.session.token) {
      try {
        await this.userService.create({
          name: ctx.from.first_name,
          telegram_id: ctx.from.id.toString(),
          telegram_user_name: ctx.from.username,
          village: "Issyk"
        });
        await ctx.reply(`Тіркелді!`);
        await ctx.telegram.sendMessage("1071927152", `Успешно зарегистрирован! ${ctx.from.first_name}`);

      } catch (e) {
        await ctx.reply(`Қате істелді!`);
        await ctx.telegram.sendMessage("1071927152", `Что то пошло не так! c ${ctx.from.first_name}`);
      }
    } else {
      await ctx.reply("Токен дұрыс емес!");
    }
    ctx.session.type = null;
    ctx.session.token = "";
  }

  async sendRegistrationToken(ctx: IContext) {
    const token = v1();
    ctx.session.type = "register";
    ctx.session.token = token;
    await ctx.reply("@SuanAbzal ға токен жіберілді, сол токенді сен маған жібер:");
    await ctx.telegram.sendMessage("1071927152", token);
    await ctx.telegram.sendMessage("1071927152", JSON.stringify(ctx.from));
  }
}
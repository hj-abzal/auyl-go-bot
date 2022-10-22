import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Users } from "./models/users.model";
import { InjectBot } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";

@Controller('messages')
export class MessagesController {
  constructor(private userService: UsersService, @InjectBot() private readonly bot: Telegraf<Context>) {
  }

  @ApiOperation({summary: 'Create new Todolist'})
  @ApiResponse({status: 200, type: Users})
  @Post()
  async send(@Body() body: any) {
    try {
      await this.bot.telegram.sendMessage('107192715', body.message)
      return {message: 'ok'};
    } catch (e) {
      return new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}

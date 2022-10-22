import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Users } from "../models/users.model";
import { MessagesService } from "../services/messages.service";
import { UsersService } from "../services/users.service";

@Controller("messages")
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService
  ) {
  }

  @ApiOperation({ summary: "Create new Todolist" })
  @ApiResponse({ status: 200, type: Users })
  @Post('/by-group')
  async sendByGroup(@Body() body: any) {
    try {
      const users = await this.usersService.getAll({group: body.group})
      return this.messagesService.sendMessage(body.message, users)
    } catch (e) {
      return new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @ApiOperation({ summary: "Create new Todolist" })
  @ApiResponse({ status: 200, type: Users })
  @Post('/to-all')
  async sendToAll(@Body() body: any) {
    try {
      const users = await this.usersService.getAll({})
      return this.messagesService.sendMessage(body.message, users)
    } catch (e) {
      return new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }
}

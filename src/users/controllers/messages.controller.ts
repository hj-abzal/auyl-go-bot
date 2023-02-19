import { Controller } from "@nestjs/common";
import { MessagesService } from "../services/messages.service";
import { UsersService } from "../services/users.service";

@Controller("messages")
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService
  ) {
  }
}

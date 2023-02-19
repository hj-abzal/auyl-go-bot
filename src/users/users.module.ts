import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./models/users.model";
import { MessagesController } from "./controllers/messages.controller";
import { MessagesService } from "./services/messages.service";
import { Posts } from "./models/posts.model";

@Module({
  controllers: [UsersController, MessagesController],
  providers: [UsersService, MessagesService],
  imports: [
    SequelizeModule.forFeature([Users, Posts])
  ],
  exports: [UsersService, MessagesService]
})
export class UsersModule {}

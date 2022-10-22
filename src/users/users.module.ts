import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "./models/users.model";
import { MessagesController } from "./messages.controller";

@Module({
  controllers: [UsersController, MessagesController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([Users])
  ]
})
export class UsersModule {}

import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  getYourPosts(@Param('id') id: number) {
    return this.userService.getAllPosts(id);
  }
}

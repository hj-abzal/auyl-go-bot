import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { Users } from "../models/users.model";

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({summary: 'Create new Todolist'})
  @ApiResponse({status: 200, type: Users})
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}

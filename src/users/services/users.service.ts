import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "../models/users.model";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private userRepository: typeof Users) {
  }

  create(dto: CreateUserDto): Promise<Users> {
    return  this.userRepository.create(dto)
  }

  getAll(params: any): Promise<Users[]> {
    return  this.userRepository.findAll({where: { ...params }})
  }
}

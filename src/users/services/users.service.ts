import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "../models/users.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { Posts } from "../models/posts.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    @InjectModel(Posts) private postsRepository: typeof Posts
  ) {
  }

  create(dto: CreateUserDto): Promise<Users> {
    return  this.userRepository.create(dto)
  }

  getAll(params?: any): Promise<Users[]> {
    if (params) {
      return  this.userRepository.findAll({where: { ...params }})
    } else {
      return  this.userRepository.findAll()
    }
  }


  getAllPosts(id: number): Promise<Posts[]> {
    return this.postsRepository.findAll({include: { all: true }, where: {id}})
  }

  createPost(dto: any): Promise<Posts> {
    return this.postsRepository.create(dto)
  }

  deletePost(id: number): Promise<any> {
    return this.postsRepository.destroy({where: {id}})
      .then(() => {
        return {message: 'ok', id};
      })
  }

}

import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Users } from "./users.model";

export interface PostCreationAttrs {
  test: string;
  todolist_id: number;
}

@Table({ tableName: "posts" })
export class Posts extends Model<Posts, PostCreationAttrs> {

  @ApiProperty({example: 1, description: 'Id of user'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'learn react', description: 'title of the task'})
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER,  allowNull: false })
  user_id: number;
}
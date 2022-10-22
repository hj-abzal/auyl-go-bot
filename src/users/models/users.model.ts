import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

export interface UserCreationAttrs {
  name: string;
  telegram_user_name: string;
  telegram_id: string;
  group: number;
}

@Table({ tableName: "users" })
export class Users extends Model<Users, UserCreationAttrs> {

  @ApiProperty({example: 1, description: 'Id of user'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({example: 'learn react', description: 'title of the task'})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({example: 'learn react', description: 'title of the task'})
  @Column({ type: DataType.STRING, allowNull: false })
  telegram_user_name: string;

  @ApiProperty({example: 'true/false', description: 'status of the task'})
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: false })
  telegram_id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  group: number;
}
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'buy bread', description: 'Title of task'})
  readonly name: string;

  @ApiProperty({example: 'buy bread', description: 'Title of task'})
  readonly telegram_user_name: string;

  @ApiProperty({example: 'buy bread', description: 'Title of task'})
  readonly telegram_id: string;

  @ApiProperty({example: 'Karasaz', description: 'Auyl of person'})
  readonly village: string;
}
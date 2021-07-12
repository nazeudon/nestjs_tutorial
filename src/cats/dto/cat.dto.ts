import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  name: string;
  age: number;
  bread: string;
}

export class UpdateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  bread: string;
}

export class ListAllEntities {
  limit: number;
}

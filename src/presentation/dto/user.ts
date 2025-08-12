import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;
}
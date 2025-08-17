import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserUsecase, CreateUserDto, UpdateUserDto } from '../usecase/user';

@Controller('users')
export class UserController {
  constructor(private readonly userUsecase: UserUsecase) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userUsecase.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userUsecase.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userUsecase.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userUsecase.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userUsecase.remove(id);
  }
}

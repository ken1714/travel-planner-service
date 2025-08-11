import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../presentation/user.controller';
import { UserUsecase } from '../../usecase/user.usecase';
import { User } from '../../domain/entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserUsecase],
  exports: [UserUsecase],
})
export class UserModule {}
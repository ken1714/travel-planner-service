import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../../presentation/user.controller';
import { UserUsecase } from '../../usecase/user';
import { User } from '../../domain/entity/user';
import { UserResolver } from '../../presentation/resolver/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserUsecase, UserResolver],
  exports: [UserUsecase],
})
export class UserModule {}

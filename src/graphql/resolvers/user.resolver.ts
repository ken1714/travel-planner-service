import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { User } from '../../domain/entity/user';
import { CreateUserInput, UpdateUserInput } from '../../presentation/dto/user.dto';
import { UserUsecase } from '../../usecase/user.usecase';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userUsecase: UserUsecase) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userUsecase.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: string): Promise<User | null> {
    return this.userUsecase.findById(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userUsecase.create(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.userUsecase.update(input.id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    await this.userUsecase.delete(id);
    return true;
  }
}
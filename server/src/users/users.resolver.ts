import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { UserService } from './users.service'
import { User } from './users.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { GetAllUsersInput } from './inputs/get-all-users.input'


@Resolver('User')
export class UsersResolver {

    constructor(
        private readonly userService: UserService
    ) { }

    @Mutation(() => User)
    async createUser(@Args('createUser') createUserInput: CreateUserInput): Promise<User> {
        try {
            return await this.userService.create(createUserInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => User)
    async updateUser(@Args('updateUser') updateUserInput: UpdateUserInput): Promise<User> {
        try {
            return await this.userService.update(updateUserInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Number)
    async removeUser(@Args('id') id: number): Promise<number> {
        try {
            return await this.userService.remove(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => User)
    async getOneUser(@Args('id') id: number): Promise<User> {
        try {
            return await this.userService.getOne(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => [User])
    async getAllUsers(@Args() getAllUsersInput: GetAllUsersInput): Promise<User[]> {
        try {
            return await this.userService.getAll(getAllUsersInput)
        } catch (error) {
            console.log(error)
        }
    }
}
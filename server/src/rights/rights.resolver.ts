import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { RightService } from './rights.service'
import { Right } from './rights.entity'
import { CreateRightInput } from './inputs/create-right.input'
import { UpdateRightInput } from './inputs/update-right.input'


@Resolver()
export class RightResolver {
    constructor(
        private readonly rightService: RightService
    ) { }

    @Mutation(() => Right)
    async createRight(@Args('createRight') createRightInput: CreateRightInput): Promise<Right> {
        try {
            return await this.rightService.create(createRightInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Right)
    async updateRight(@Args('updateRight') updateRightInput: UpdateRightInput): Promise<Right> {
        try {
            return await this.rightService.update(updateRightInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Number)
    async removeRight(@Args('id') id: number): Promise<number> {
        try {
            return await this.rightService.remove(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => Right)
    async getOneRight(@Args('id') id: number): Promise<Right> {
        try {
            return await this.rightService.getOne(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => [Right])
    async getAllRights(): Promise<Right[]> {
        try {
            return await this.rightService.getAll()
        } catch (error) {
            console.log(error)
        }
    }
}
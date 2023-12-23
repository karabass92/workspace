import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { PositionService } from './positions.service'
import { Position } from './positions.entity'
import { CreatePositionInput } from './inputs/create-position.input'
import { UpdatePositionInput } from './inputs/update-position.input'


@Resolver()
export class PositionResolver {
    constructor(
        private readonly positionService: PositionService
    ) { }

    @Mutation(() => Position)
    async createPosition(@Args('createPosition') createPositionInput: CreatePositionInput): Promise<Position> {
        try {
            return await this.positionService.create(createPositionInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Position)
    async updatePosition(@Args('updatePosition') updatePositionInput: UpdatePositionInput): Promise<Position> {
        try {
            return await this.positionService.update(updatePositionInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Number)
    async removePosition(@Args('id') id: number): Promise<number> {
        try {
            return await this.positionService.remove(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => Position)
    async getOnePosition(@Args('id') id: number): Promise<Position> {
        try {
            return await this.positionService.getOne(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => [Position])
    async getAllPositions(): Promise<Position[]> {
        try {
            return await this.positionService.getAll()
        } catch (error) {
            console.log(error)
        }
    }
}
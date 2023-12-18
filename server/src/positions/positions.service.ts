import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Position } from './positions.entity'
import { CreatePositionInput } from './inputs/create-position.input'
import { UpdatePositionInput } from './inputs/update-position.input'


@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(Position) private readonly positionRepository: Repository<Position>
    ) { }

    async create(createPositionInput: CreatePositionInput): Promise<Position> {
        try {
            return await this.positionRepository.save(createPositionInput)
        } catch (error) {
            console.log(error)
        }
    }

    async update(updatePositionInput: UpdatePositionInput): Promise<Position> {
        try {
            return await this.getOne(updatePositionInput.id)
        } catch (error) {
            console.log(error)
        }
        await this.positionRepository.update(
            { id: updatePositionInput.id },
            {
                name: updatePositionInput.name
            }
        )
    }

    async remove(id: number): Promise<number> {
        try {
            await this.positionRepository.delete({ id })
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id: number): Promise<Position> {
        try {
            return await this.positionRepository.findOne({ where: { id } })
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(): Promise<Position[]> {
        try {
            return await this.positionRepository.find()
        } catch (error) {
            console.log(error)
        }
    }
}
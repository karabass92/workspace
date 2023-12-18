import { Injectable, BadRequestException } from '@nestjs/common'
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

    private async validatePosition(name?: string, id?: number): Promise<void> {
        try {
            if (name) {
                const modifiedName = this.modifyName(name)
                const positionName = await this.positionRepository.findOneBy({ name: modifiedName })
                if (positionName) throw new BadRequestException('Должность с таким наименованием уже заведена!')
            }
            if (id) {
                const positionId = this.positionRepository.findOneBy({ id: id })
                if (!positionId) throw new BadRequestException('Должность с таким id номером не найдена!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    private modifyName(name: string): string {
        try {
            const modifiedName = name.trim().toLowerCase()
            return modifiedName.charAt(0).toUpperCase() + modifiedName.slice(1)
        } catch (error) {
            console.log(error)
        }
    }

    async create(createPositionInput: CreatePositionInput): Promise<Position> {
        try {
            const name = this.modifyName(createPositionInput.name)
            await this.validatePosition(name)
            return await this.positionRepository.save(createPositionInput)
        } catch (error) {
            console.log(error)
        }
    }

    async update(updatePositionInput: UpdatePositionInput): Promise<Position> {
        try {
            const name = this.modifyName(updatePositionInput.name)
            await this.validatePosition(name, updatePositionInput.id)
            await this.positionRepository.update(
                { id: updatePositionInput.id },
                { name: name }
            )
            return await this.getOne(updatePositionInput.id)
        } catch (error) {
            console.log(error)
        }

    }

    async remove(id: number): Promise<number> {
        try {
            await this.validatePosition('', id)
            await this.positionRepository.delete({ id })
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id: number): Promise<Position> {
        try {
            await this.validatePosition('', id)
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
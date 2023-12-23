import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Right } from './rights.entity'
import { CreateRightInput } from './inputs/create-right.input'
import { UpdateRightInput } from './inputs/update-right.input'


@Injectable()
export class RightService {
    constructor(
        @InjectRepository(Right) private readonly rightRepository: Repository<Right>
    ) { }

    private async validateRight(name?: string, id?: number): Promise<void> {
        if (name) {
            const modifiedName = this.modifyName(name)
            const rightName = await this.rightRepository.findOneBy({ name: modifiedName })
            if (rightName) throw new BadRequestException('Права с таким наименованием уже заведены!')
        }
        if (id) {
            const rightId = await this.rightRepository.findOneBy({ id: id })
            if (!rightId) throw new BadRequestException('Права с таким id номером не найдены!')
        }
    }

    private modifyName(name: string): string {
        try {
            const modifiedName = name.trim().toLowerCase()
            return modifiedName.charAt(0).toUpperCase() + modifiedName.slice(1)
        } catch (error) {
            console.error(error)
        }
    }

    async create(createRightInput: CreateRightInput): Promise<Right> {
        try {
            const name = this.modifyName(createRightInput.name)
            await this.validateRight(name)
            return await this.rightRepository.save({ name })
        } catch (error) {
            console.error(error)
        }
    }

    async update(updateRightInput: UpdateRightInput): Promise<Right> {
        try {
            const name = this.modifyName(updateRightInput.name)
            await this.validateRight(name, updateRightInput.id)
            await this.rightRepository.update(
                { id: updateRightInput.id },
                { name: name }
            )
            return await this.getOne(updateRightInput.id)
        } catch (error) {
            console.error(error)
        }
    }

    async remove(id: number): Promise<number> {
        try {
            await this.validateRight('', id)
            await this.rightRepository.delete({ id })
            return id
        } catch (error) {
            console.error(error)
        }
    }

    async getOne(id: number): Promise<Right> {
        try {
            await this.validateRight('', id)
            return await this.rightRepository.findOne({ where: { id } })
        } catch (error) {
            console.error(error)
        }
    }

    async getAll(): Promise<Right[]> {
        try {
            return await this.rightRepository.find({ order: { id: 'ASC' } })
        } catch (error) {
            console.error(error)
        }
    }
}
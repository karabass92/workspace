import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Departament } from './departaments.entity'
import { CreateDepartamentInput } from './inputs/create-departament.input'
import { UpdateDepartamentInput } from './inputs/update-departament.input'


@Injectable()
export class DepartamentService {
    constructor(
        @InjectRepository(Departament) private readonly departamentRepository: Repository<Departament>
    ) { }

    async create(createDepartamentInput: CreateDepartamentInput): Promise<Departament> {
        try {
            return await this.departamentRepository.save(createDepartamentInput)
        } catch (error) {
            console.log(error)
        }
    }

    async update(updateDepartamentInput: UpdateDepartamentInput): Promise<Departament> {
        try {
            return await this.getOne(updateDepartamentInput.id)
        } catch (error) {
            console.log(error)
        }
        await this.departamentRepository.update(
            { id: updateDepartamentInput.id },
            {
                name: updateDepartamentInput.name
            }
        )
    }

    async remove(id: number): Promise<number> {
        try {
            await this.departamentRepository.delete({ id })
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id: number): Promise<Departament> {
        try {
            return await this.departamentRepository.findOne({ where: { id } })
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(): Promise<Departament[]> {
        try {
            return await this.departamentRepository.find()
        } catch (error) {
            console.log(error)
        }
    }
}
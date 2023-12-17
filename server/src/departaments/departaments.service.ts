import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Departament } from './departaments.entity'
import { CreateDepartamentInput } from './inputs/create-departament.input'
import { UpdateDepartamentInput } from './inputs/update-departament.input'


@Injectable()
export class DepartamentService {
    constructor(
        @InjectRepository(Departament)
        private readonly departamentRepository: Repository<Departament>
    ) { }

    async create(createDepartamentInput: CreateDepartamentInput): Promise<Departament> {
        return await this.departamentRepository.save(createDepartamentInput)
    }

    async update(updateDepartamentInput: UpdateDepartamentInput): Promise<Departament> {
        await this.departamentRepository.update(
            { id: updateDepartamentInput.id },
            {
                name: updateDepartamentInput.name
            }
        )
        return await this.getOne(updateDepartamentInput.id)
    }

    async remove(id: number): Promise<number> {
        await this.departamentRepository.delete({ id })
        return id
    }

    async getOne(id: number): Promise<Departament> {
        return await this.departamentRepository.findOne({ where: { id } })
    }

    async getAll(): Promise<Departament[]> {
        return await this.departamentRepository.find()
    }
}
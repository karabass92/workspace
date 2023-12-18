import { Injectable, BadRequestException } from '@nestjs/common'
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

    private async validateDepartament(name?: string, id?: number): Promise<void> {
        try {
            if (name) {
                const modifiedName = this.modifyName(name)
                const departamentName = await this.departamentRepository.findOneBy({ name: modifiedName })
                if (departamentName) throw new BadRequestException('Подразделение с таким наименованием уже заведено!')
            }
            if (id) {
                const departamentId = this.departamentRepository.findOneBy({ id: id })
                if (!departamentId) throw new BadRequestException('Подразделение с таким id номером не найдено!')
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

    async create(createDepartamentInput: CreateDepartamentInput): Promise<Departament> {
        try {
            const name = this.modifyName(createDepartamentInput.name)
            await this.validateDepartament(name)
            return await this.departamentRepository.save({ name })
        } catch (error) {
            console.log(error)
        }
    }

    async update(updateDepartamentInput: UpdateDepartamentInput): Promise<Departament> {
        try {
            const name = this.modifyName(updateDepartamentInput.name)
            await this.validateDepartament(name, updateDepartamentInput.id)
            await this.departamentRepository.update(
                { id: updateDepartamentInput.id },
                { name: name }
            )
            return await this.getOne(updateDepartamentInput.id)
        } catch (error) {
            console.log(error)
        }

    }

    async remove(id: number): Promise<number> {
        try {
            await this.validateDepartament('', id)
            await this.departamentRepository.delete({ id })
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id: number): Promise<Departament> {
        try {
            await this.validateDepartament('', id)
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
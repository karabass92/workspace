import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { DepartamentService } from './departaments.service'
import { Departament } from './departaments.entity'
import { CreateDepartamentInput } from './inputs/create-departament.input'
import { UpdateDepartamentInput } from './inputs/update-departament.input'


@Resolver()
export class DepartamentResolver {
    constructor(
        private readonly departamentService: DepartamentService
    ) { }

    @Mutation(() => Departament)
    async createDepartament(@Args('createDepartament') createDepartamentInput: CreateDepartamentInput): Promise<Departament> {
        try {
            return await this.departamentService.create(createDepartamentInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Departament)
    async updateDepartament(@Args('updateDepartament') updateDepartamentInput: UpdateDepartamentInput): Promise<Departament> {
        try {
            return await this.departamentService.update(updateDepartamentInput)
        } catch (error) {
            console.log(error)
        }
    }

    @Mutation(() => Number)
    async removeDepartament(@Args('id') id: number): Promise<number> {
        try {
            return await this.departamentService.remove(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => Departament)
    async getOneDepartament(@Args('id') id: number): Promise<Departament> {
        try {
            return await this.departamentService.getOne(id)
        } catch (error) {
            console.log(error)
        }
    }

    @Query(() => [Departament])
    async getAllDepartaments(): Promise<Departament[]> {
        try {
            return await this.departamentService.getAll()
        } catch (error) {
            console.log(error)
        }
    }
}
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { Departament } from 'src/departaments/departaments.entity'
import { Position } from 'src/positions/positions.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { GetAllUsersInput } from './inputs/get-all-users.input'
import * as bcrypt from 'bcryptjs'
import { SALT } from 'src/constants'


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Departament) private readonly departamentReposiory: Repository<Departament>,
        @InjectRepository(Position) private readonly positionRepository: Repository<Position>,
    ) { }

    private async validateUser(login?: string, id?: number): Promise<void> {
        if (login) {
            const userLogin = await this.userRepository.findOneBy({ login: login.trim() })
            if (userLogin) throw new BadRequestException('Пользователь с таким логином уже заведен!')
        }
        if (id) {
            const userId = await this.userRepository.findOneBy({ id: id })
            if (!userId) throw new BadRequestException('Пользователь с таким id номером не найден!')
        }
    }

    private async validateDepartament(id?: number): Promise<void> {
        if (id) {
            const departament = await this.departamentReposiory.findOneBy({ id: id })
            if (!departament) throw new BadRequestException('Подразделение с таким id номером не найдено!')
        }
    }

    private async validatePosition(id: number): Promise<void> {
        if (id) {
            const position = await this.positionRepository.findOneBy({ id: id })
            if (!position) throw new BadRequestException('Должность с таким id номером не найдена!')
        }
    }

    async create(createUserInput: CreateUserInput): Promise<User> {
        try {
            await this.validateUser(createUserInput.login)
            await this.validateDepartament(createUserInput.departament?.id)
            await this.validatePosition(createUserInput.position.id)
            return await this.userRepository.save({
                ...createUserInput,
                login: createUserInput.login.trim(),
                password: await bcrypt.hash(createUserInput.password, SALT),
            })
        } catch (error) {
            console.log(error)
        }
    }

    async update(updateUserInput: UpdateUserInput): Promise<User> {
        try {
            await this.validateUser(updateUserInput.login, updateUserInput.id)
            await this.validateDepartament(updateUserInput.departament?.id)
            await this.validatePosition(updateUserInput.position?.id)
            if (updateUserInput.password) {
                updateUserInput.password = await bcrypt.hash(updateUserInput.password, SALT)
            }
            await this.userRepository.update(
                { id: updateUserInput.id },
                {
                    ...updateUserInput,
                    login: updateUserInput.login?.trim(),
                }
            )
            return await this.getOne(updateUserInput.id)
        } catch (error) {
            console.log(error)
        }
    }

    async remove(id: number): Promise<number> {
        try {
            await this.validateUser('', id)
            await this.userRepository.delete({ id })
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id: number): Promise<User> {
        try {
            await this.validateUser('', id)
            return await this.userRepository.findOne({
                where: { 
                    id: id
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(getAllUsersInput?: GetAllUsersInput): Promise<User[]> {
        try {
            await this.validateDepartament(getAllUsersInput.departamentId)
            await this.validatePosition(getAllUsersInput.positionId)
            return await this.userRepository.find({
                where: {
                    position: { id: getAllUsersInput.positionId },
                    departament: { id: getAllUsersInput.departamentId }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
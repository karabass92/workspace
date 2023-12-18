import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import * as bcrypt from 'bcryptjs'
import { SALT } from 'src/constants'
import { GetAllUsersInput } from './inputs/get-all-users.input'


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserInput: CreateUserInput): Promise<User> {
        try {

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
            await this.userRepository.update(
                { id: updateUserInput.id },
                {
                    ...updateUserInput,
                    login: updateUserInput.login.trim(),
                    password: await bcrypt.hash(updateUserInput.password, SALT),
                }
            )
            return await this.getOne(updateUserInput.id)
        } catch (error) {
            console.log(error)
        }
    }

    async remove(id: number): Promise<number> {
        try {
            await this.userRepository.delete({ id })
            return id
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id: number): Promise<User> {
        try {
            return await this.userRepository.findOne({ where: { id } })
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(getAllUsersInput?: GetAllUsersInput): Promise<User[]> {
        try {
            return await this.userRepository.find({
                relations: {
                    departament: true,
                    position: true
                },
                where: {
                    position: {id: getAllUsersInput.positionId},
                    departament: {id: getAllUsersInput.departamentId}
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
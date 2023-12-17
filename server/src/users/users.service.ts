import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { CreateUserInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import * as bcrypt from 'bcryptjs'
import { SALT } from 'src/constants'


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(createUserInput: CreateUserInput): Promise<User> {
        return await this.userRepository.save({
            ...createUserInput,
            login: createUserInput.login.trim(),
            password: await bcrypt.hash(createUserInput.password, SALT),
        })
    }

    async update(updateUserInput: UpdateUserInput): Promise<User> {
        await this.userRepository.update(
            { id: updateUserInput.id },
            {
                ...updateUserInput,
                login: updateUserInput.login.trim(),
                password: await bcrypt.hash(updateUserInput.password, SALT),
            }
        )
        return await this.getOne(updateUserInput.id)
    }

    async remove(id: number): Promise<number> {
        await this.userRepository.delete({ id })
        return id
    }

    async getOne(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } })
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find()
    }
}
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './users.entity'
import { DepartamentService } from 'src/departaments/departaments.service'
import { Departament } from 'src/departaments/departaments.entity'
import { Position } from 'src/positions/positions.entity'


@Module({
	imports: [
		TypeOrmModule.forFeature([User, Departament, Position]),
		
	],
	providers: [
		UserService,
		UsersResolver,
		DepartamentService
	]
})
export class UsersModule { }
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './users.service'
import { UsersResolver } from './users.resolver'
import { User } from './users.entity'


@Module({
	imports: [
		TypeOrmModule.forFeature([User])
	],
	providers: [
		UserService,
		UsersResolver
	]
})
export class UsersModule { }
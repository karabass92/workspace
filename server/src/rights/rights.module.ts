import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RightService } from './rights.service'
import { RightResolver } from './rights.resolver'
import { Right } from './rights.entity'


@Module({
    imports: [
		TypeOrmModule.forFeature([Right])
	],
    providers: [
		RightService, 
		RightResolver
	]
})
export class RightsModule { }
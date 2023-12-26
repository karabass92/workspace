import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagService } from './tags.service'
import { TagResolver } from './tags.resolver'
import { Tag } from './tags.entity'


@Module({
	imports: [
		TypeOrmModule.forFeature([Tag])
	],
	providers: [
		TagService, 
		TagResolver
	]
})
export class TagsModule { }
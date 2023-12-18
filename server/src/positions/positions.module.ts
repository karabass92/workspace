import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionService } from './positions.service';
import { PositionResolver } from './positions.resolver';
import { Position } from './positions.entity';


@Module({
	imports: [
		TypeOrmModule.forFeature([Position])
	],
	providers: [
		PositionService, 
		PositionResolver
	]
})
export class PositionsModule { }
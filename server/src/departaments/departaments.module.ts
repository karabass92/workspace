import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartamentResolver } from './departaments.resolver'
import { DepartamentService } from './departaments.service'
import { Departament } from './departaments.entity'


@Module({
    imports: [
        TypeOrmModule.forFeature([Departament])
    ],
    providers: [
        DepartamentResolver, 
        DepartamentService
    ]
})
export class DepartamentsModule { }
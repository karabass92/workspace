import { PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'


@ObjectType()
@Entity({ name: 'departaments' })
export class Departament {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    name: string

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}
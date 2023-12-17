import { PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'


@ObjectType()
@Entity({ name: 'users' })
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    login: string

    @Field()
    @Column({ select: false })
    password: string

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}
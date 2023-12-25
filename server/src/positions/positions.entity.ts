import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/users/users.entity'


@ObjectType()
@Entity({ name: 'positions' })
export class Position {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    name: string

    @OneToMany(() => User, (user) => user.position, { cascade: true })
    users: User[]
}
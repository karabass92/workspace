import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/users/users.entity'


@ObjectType()
@Entity({ name: 'departaments' })
export class Departament {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    name: string

    @OneToMany(() => User, (user) => user.departament, { cascade: true })
    users: User[]
}
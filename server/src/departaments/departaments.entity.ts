import { PrimaryGeneratedColumn, Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/users/users.entity'
import { Right } from 'src/rights/rights.entity'


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

    @Field((type) => [Right])
    @ManyToMany(() => Right, { onDelete: 'CASCADE', eager: true, nullable: true })
    @JoinTable({ name: 'departament_rights' })
    rights?: [Right]
}
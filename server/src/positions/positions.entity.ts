import { PrimaryGeneratedColumn, Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { User } from 'src/users/users.entity'
import { Right } from 'src/rights/rights.entity'


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

    @Field((type) => [Right])
    @ManyToMany(() => Right, { onDelete: 'CASCADE', eager: true, nullable: true })
    @JoinTable({ name: 'position_rights' })
    rights?: [Right]
}
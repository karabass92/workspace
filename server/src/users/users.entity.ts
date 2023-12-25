import {
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BeforeUpdate,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'
import { Departament } from 'src/departaments/departaments.entity'
import { Position } from 'src/positions/positions.entity'
import { Right } from 'src/rights/rights.entity'


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
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date

    @Field()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date

    @BeforeUpdate()
    updateTimestamp() { this.updatedAt = new Date() }

    @Field((type) => Departament, { nullable: true })
    @ManyToOne((type) => Departament, (departament) => departament.users, 
        { onDelete: 'SET NULL', eager: true }
    )
    departament: Departament

    @Field((type) => Position)
    @ManyToOne((type) => Position, (position) => position.users, 
        { onDelete: 'SET NULL', eager: true }
    )
    position: Position

    @Field((type) => [Right])
    @ManyToMany(() => Right, { onDelete: 'CASCADE', eager: true, nullable: true })
    @JoinTable({ name: 'user_rights' })
    rights?: [Right]
}
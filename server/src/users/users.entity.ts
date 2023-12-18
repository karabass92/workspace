import {
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    JoinColumn,
    BeforeUpdate,
    ManyToOne
} from 'typeorm'
import {
    ObjectType,
    Field,
    ID
} from '@nestjs/graphql'
import { Departament } from 'src/departaments/departaments.entity'



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
    updateTimestamp() { this.updatedAt = new Date }

    @Field((type) => Departament)
    @ManyToOne((type) => Departament, (departament) => departament.users, { onDelete: 'SET NULL' })
    departament: Departament
}
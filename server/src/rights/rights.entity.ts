import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToMany
} from 'typeorm'
import {
    ObjectType,
    Field,
    ID
} from '@nestjs/graphql'
import { User } from 'src/users/users.entity'


@ObjectType()
@Entity({ name: 'rights' })
export class Right {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    name: string

    @ManyToMany(() => User, user => user.rights)
    users: User[]
}
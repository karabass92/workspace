import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'
import { ObjectType, Field, ID } from '@nestjs/graphql'


@ObjectType()
@Entity({ name: 'rights' })
export class Right {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    name: string
}
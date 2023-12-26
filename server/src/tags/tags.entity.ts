import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"


@ObjectType()
@Entity({ name: 'tags' })
export class Tag {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ unique: true })
    name: string
}
import { InputType, Field, ID } from '@nestjs/graphql'


@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    id: number

    @Field({ nullable: true })
    login: string

    @Field({ nullable: true })
    password: string
}
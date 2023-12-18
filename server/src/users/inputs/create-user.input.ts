import { InputType, Field } from '@nestjs/graphql'
import { UserDepartamentInput } from './user-departament.input'


@InputType()
export class CreateUserInput {
    @Field()
    login: string

    @Field()
    password: string

    @Field(type => UserDepartamentInput, { nullable: true })
    departament?: { id: number }
}
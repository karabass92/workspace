import { InputType, Field } from '@nestjs/graphql'
import { UserDepartamentInput } from './user-departament.input'
import { UserPositionInput } from './user-position.input'
import { UserRightInput } from './user-right.input'


@InputType()
export class CreateUserInput {
    @Field()
    login: string

    @Field()
    password: string

    @Field(type => UserDepartamentInput, { nullable: true })
    departament?: { id: number }

    @Field(type => UserPositionInput, { nullable: false })
    position?: { id: number }

    @Field(type => [UserRightInput], { nullable: true })
    rights: UserRightInput[]
}
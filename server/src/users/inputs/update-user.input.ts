import { InputType, Field, ID } from '@nestjs/graphql'
import { UserDepartamentInput } from './user-departament.input'
import { UserPositionInput } from './user-position.input'
import { UserRightInput } from './user-right.input'


@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    id: number

    @Field({ nullable: true })
    login: string

    @Field({ nullable: true })
    password: string

    @Field(type => UserDepartamentInput, { nullable: true })
    departament: { id: number }

    @Field(type => UserPositionInput, { nullable: true })
    position: { id: number }

    @Field(type => [UserRightInput], { nullable: true })
    rights: UserRightInput[]
}
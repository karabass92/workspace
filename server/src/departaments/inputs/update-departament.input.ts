import { InputType, Field, ID } from '@nestjs/graphql'
import { DepartamentRightInput } from './departament-right.input'


@InputType()
export class UpdateDepartamentInput {
    @Field(() => ID)
    id: number

    @Field({ nullable: true })
    name: string

    @Field(type => [DepartamentRightInput], { nullable: true })
    rights: [DepartamentRightInput]
}
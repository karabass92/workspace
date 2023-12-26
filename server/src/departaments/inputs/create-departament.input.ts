import { InputType, Field } from '@nestjs/graphql'
import { DepartamentRightInput } from './departament-right.input'


@InputType()
export class CreateDepartamentInput {
    @Field({ nullable: false })
    name: string

    @Field(type => [DepartamentRightInput], { nullable: true })
    rights: [DepartamentRightInput]
}
import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class CreateDepartamentInput {
    @Field({ nullable: false })
    name: string
}
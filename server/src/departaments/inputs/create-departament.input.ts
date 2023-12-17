import { InputType, Field, ID } from '@nestjs/graphql'


@InputType()
export class CreateDepartamentInput {
    @Field({ nullable: false })
    name: string
}
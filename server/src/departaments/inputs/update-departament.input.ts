import { InputType, Field, ID } from '@nestjs/graphql'


@InputType()
export class UpdateDepartamentInput {
    @Field(() => ID)
    id: number

    @Field({ nullable: false })
    name: string
}
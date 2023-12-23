import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class CreateRightInput {
    @Field({ nullable: false })
    name: string
}
import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class CreatePositionInput {
    @Field({ nullable: false })
    name: string
}
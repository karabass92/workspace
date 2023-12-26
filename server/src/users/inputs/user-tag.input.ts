import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class UserTagInput {
    @Field({ nullable: true })
    id: number
}
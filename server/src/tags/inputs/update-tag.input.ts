import { InputType, Field, ID } from '@nestjs/graphql'


@InputType()
export class UpdateTagInput {
    @Field(() => ID)
    id: number

    @Field()
    name: string
}
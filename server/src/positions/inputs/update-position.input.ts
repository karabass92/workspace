import { InputType, Field, ID } from '@nestjs/graphql'


@InputType()
export class UpdatePositionInput {
    @Field(() => ID)
    id: number

    @Field({ nullable: false })
    name: string
}
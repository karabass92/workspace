import { InputType, Field, ID } from '@nestjs/graphql'
import { PositionRightInput } from './position-right.input'


@InputType()
export class UpdatePositionInput {
    @Field(() => ID)
    id: number

    @Field({ nullable: false })
    name: string

    @Field(type => [PositionRightInput], { nullable: true })
    rights: PositionRightInput[]
}
import { InputType, Field } from '@nestjs/graphql'
import { PositionRightInput } from './position-right.input'


@InputType()
export class CreatePositionInput {
    @Field({ nullable: false })
    name: string

    @Field(type => [PositionRightInput], { nullable: true })
    rights: PositionRightInput[]
}
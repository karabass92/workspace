import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class PositionRightInput {
    @Field({ nullable: true})
    id: number
}
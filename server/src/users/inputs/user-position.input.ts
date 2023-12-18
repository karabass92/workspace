import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class UserPositionInput {
    @Field()
    id: number
}
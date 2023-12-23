import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class UserRightInput {
    @Field({ nullable: true })
    id: number
}
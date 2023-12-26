import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class DepartamentRightInput {
    @Field({ nullable: true})
    id: number
}
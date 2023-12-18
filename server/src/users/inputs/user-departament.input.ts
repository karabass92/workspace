import { InputType, Field } from '@nestjs/graphql'


@InputType()
export class UserDepartamentInput {
    @Field()
    id: number
}
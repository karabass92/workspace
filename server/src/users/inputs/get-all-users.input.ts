import { ArgsType, Field } from "@nestjs/graphql"
import { IsNumber } from "class-validator"


@ArgsType()
export class GetAllUsersInput {
    @Field({ nullable: true})
    @IsNumber()
    departamentId: number

    @Field({ nullable: true})
    @IsNumber()
    positionId: number
}
import { Module } from '@nestjs/common'
import { ConfigModule  } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { DepartamentsModule } from './departaments/departaments.module'
import { PositionsModule } from './positions/positions.module'
import { RightsModule } from './rights/rights.module';
import { TagsModule } from './tags/tags.module';


@Module({
    imports: [

        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '../.env'
        }),
        
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            playground: true
        }),
        
        DatabaseModule, UsersModule, DepartamentsModule, PositionsModule, RightsModule, TagsModule
    ],

    providers: [],
})
export class AppModule { }
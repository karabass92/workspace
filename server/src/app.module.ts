import { Module } from '@nestjs/common'
import { ConfigModule  } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module';


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
        
        DatabaseModule, UsersModule
    ],

    providers: [],
})
export class AppModule { }
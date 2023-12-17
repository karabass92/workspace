import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: config.get<'postgres'>('TYPEORM_CONNECTION'),
                host: config.get<string>('TYPEORM_HOST'),
                port: config.get<number>('TYPEORM_PORT'),
                username: config.get<string>('TYPEORM_USERNAME'),
                password: config.get<string>('TYPEORM_PASSWORD'),
                database: config.get<string>('TYPEORM_DATABASE'),
                entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
                synchronize: true,
                autoLoadEntities: true,
                logging: true,
                retryAttempts: 5,
                retryDelay: 5000,
            })
        })
    ]
})
export class DatabaseModule { }
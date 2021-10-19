import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('postgres').POSTGRES_DB_HOST,
                port: configService.get('postgres').POSTGRES_DB_PORT,
                username: configService.get('postgres').POSTGRES_USER,
                password: configService.get('postgres').POSTGRES_PASSWORD,
                database: configService.get('postgres').POSTGRES_DB_SCHEMA,
                entities: [
                    __dirname + '/../**/entities/*.entity.{ts,js}',
                ],
                /* Note : it is unsafe to use synchronize: true for schema synchronization
                on production once you get data in your database. */
                // synchronize: true,
                autoLoadEntities: true,
            })
        }),
    ],
})
export class DatabaseModule {}

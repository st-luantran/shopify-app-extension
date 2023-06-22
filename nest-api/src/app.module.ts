import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthorModule } from './authors/author.module';
import { LoggerModule } from './logger/logger.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    AuthorModule,
    CustomerModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

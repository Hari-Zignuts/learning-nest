import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      validationSchema: envValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigAppModule {}

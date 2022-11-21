import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fhelp - Users Microservice')
  .setDescription('Users microservice for Fhelp')
  .setVersion('1.0.0')
  .build();

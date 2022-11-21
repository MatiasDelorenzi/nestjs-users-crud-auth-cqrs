import { Controller, Get } from '@nestjs/common';
import { AppService } from '@services';
import { HealthDecorators } from '@decorators';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HealthDecorators()
  getHealth(): string {
    return this.appService.getHealth();
  }
}

import { MICROSERVICE_OK_STATUS_MESSAGE } from '@constants';
import { AppController } from '@controllers';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '@services';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('/health', () => {
    it("should return 'Microservice status: OK'", () => {
      const response = appService.getHealth();
      expect(response).toEqual(MICROSERVICE_OK_STATUS_MESSAGE);
    });
  });
});

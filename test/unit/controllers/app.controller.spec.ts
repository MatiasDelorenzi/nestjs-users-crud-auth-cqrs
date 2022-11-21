import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@controllers';
import { AppService } from '@services';
import { MICROSERVICE_OK_STATUS_MESSAGE } from '@src/utils/constants';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('/Health', () => {
    it('should return "Microservice Status: OK"', () => {
      const response = appController.getHealth();
      expect(response).toEqual(MICROSERVICE_OK_STATUS_MESSAGE);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { MICROSERVICE_OK_STATUS_MESSAGE } from '@src/utils/constants';

describe('Health', () => {
  let app: INestApplication;
  let httpServer: unknown;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpServer = app.getHttpServer();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should return Microservice status: OK when /health endpoint is called', async () => {
    const { text, status } = await request(httpServer).get('/health');
    expect(status).toEqual(HttpStatus.OK);
    expect(text).toEqual(MICROSERVICE_OK_STATUS_MESSAGE);
  });
});

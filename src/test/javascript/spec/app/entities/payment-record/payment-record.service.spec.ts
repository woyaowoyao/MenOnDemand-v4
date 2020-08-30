/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import PaymentRecordService from '@/entities/payment-record/payment-record.service';
import { PaymentRecord, PayTraType } from '@/shared/model/payment-record.model';

const mockedAxios: any = axios;
const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe('Service Tests', () => {
  describe('PaymentRecord Service', () => {
    let service: PaymentRecordService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new PaymentRecordService();
      currentDate = new Date();

      elemDefault = new PaymentRecord(0, PayTraType.PAID, 0, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            issuedTime: format(currentDate, DATE_TIME_FORMAT),
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        mockedAxios.get.mockReturnValue(Promise.reject(error));
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a PaymentRecord', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            issuedTime: format(currentDate, DATE_TIME_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            issuedTime: currentDate,
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a PaymentRecord', async () => {
        mockedAxios.post.mockReturnValue(Promise.reject(error));

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a PaymentRecord', async () => {
        const returnedFromService = Object.assign(
          {
            txnType: 'BBBBBB',
            amount: 1,
            totalAmountToMentor: 1,
            issuedTime: format(currentDate, DATE_TIME_FORMAT),
            remarks: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            issuedTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a PaymentRecord', async () => {
        mockedAxios.put.mockReturnValue(Promise.reject(error));

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of PaymentRecord', async () => {
        const returnedFromService = Object.assign(
          {
            txnType: 'BBBBBB',
            amount: 1,
            totalAmountToMentor: 1,
            issuedTime: format(currentDate, DATE_TIME_FORMAT),
            remarks: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            issuedTime: currentDate,
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of PaymentRecord', async () => {
        mockedAxios.get.mockReturnValue(Promise.reject(error));

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a PaymentRecord', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a PaymentRecord', async () => {
        mockedAxios.delete.mockReturnValue(Promise.reject(error));

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});

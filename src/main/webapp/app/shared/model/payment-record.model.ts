import { IUser } from '@/shared/model/user.model';

export const enum PayTraType {
  PAID = 'PAID',
  ISSUED = 'ISSUED',
  CANCELLED = 'CANCELLED',
}

export interface IPaymentRecord {
  id?: number;
  txnType?: PayTraType;
  amount?: number;
  totalAmountToMentor?: number;
  issuedTime?: Date;
  remarks?: string;
  user?: IUser;
}

export class PaymentRecord implements IPaymentRecord {
  constructor(
    public id?: number,
    public txnType?: PayTraType,
    public amount?: number,
    public totalAmountToMentor?: number,
    public issuedTime?: Date,
    public remarks?: string,
    public user?: IUser
  ) {}
}

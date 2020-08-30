import { IUser } from '@/shared/model/user.model';

export const enum TrainStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface IMentor {
  id?: number;
  username?: string;
  linkedin?: string;
  regDatetime?: Date;
  regCode?: string;
  experience?: number;
  status?: TrainStatus;
  user?: IUser;
}

export class Mentor implements IMentor {
  constructor(
    public id?: number,
    public username?: string,
    public linkedin?: string,
    public regDatetime?: Date,
    public regCode?: string,
    public experience?: number,
    public status?: TrainStatus,
    public user?: IUser
  ) {}
}

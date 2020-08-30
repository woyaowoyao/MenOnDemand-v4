import { ITraining } from '@/shared/model/training.model';
import { IUser } from '@/shared/model/user.model';

export const enum DurationType {
  Morning0800 = 'Morning0800',
  Morning1000 = 'Morning1000',
  Afternoon1400 = 'Afternoon1400',
  Afternoon1600 = 'Afternoon1600',
}

export interface IMyCalendar {
  id?: number;
  calDate?: Date;
  duration?: DurationType;
  remarks?: string;
  training?: ITraining;
  user?: IUser;
}

export class MyCalendar implements IMyCalendar {
  constructor(
    public id?: number,
    public calDate?: Date,
    public duration?: DurationType,
    public remarks?: string,
    public training?: ITraining,
    public user?: IUser
  ) {}
}

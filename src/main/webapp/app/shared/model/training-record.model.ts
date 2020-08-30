import { IUser } from '@/shared/model/user.model';
import { ITraining } from '@/shared/model/training.model';
import { ITechnology } from '@/shared/model/technology.model';

export const enum TrainRecordStatus {
  Propose = 'Propose',
  Progress = 'Progress',
  Completed = 'Completed',
}

export const enum ProgressType {
  One = 'One',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
}

export interface ITrainingRecord {
  id?: number;
  status?: TrainRecordStatus;
  progress?: ProgressType;
  commissionAmount?: number;
  avgRating?: number;
  amountReceived?: number;
  userName?: string;
  fees?: number;
  remarks?: string;
  user?: IUser;
  training?: ITraining;
  skill?: ITechnology;
}

export class TrainingRecord implements ITrainingRecord {
  constructor(
    public id?: number,
    public status?: TrainRecordStatus,
    public progress?: ProgressType,
    public commissionAmount?: number,
    public avgRating?: number,
    public amountReceived?: number,
    public userName?: string,
    public fees?: number,
    public remarks?: string,
    public user?: IUser,
    public training?: ITraining,
    public skill?: ITechnology
  ) {}
}

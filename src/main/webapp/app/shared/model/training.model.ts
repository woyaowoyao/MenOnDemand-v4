export const enum TrainStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export interface ITraining {
  id?: number;
  status?: TrainStatus;
  name?: string;
  commissionAmount?: number;
  avgRating?: number;
  startDate?: Date;
  endDate?: Date;
  remarks?: string;
}

export class Training implements ITraining {
  constructor(
    public id?: number,
    public status?: TrainStatus,
    public name?: string,
    public commissionAmount?: number,
    public avgRating?: number,
    public startDate?: Date,
    public endDate?: Date,
    public remarks?: string
  ) {}
}

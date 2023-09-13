import { StaffInTask } from "./staffintask.entity";

export class Task {
  Id: number;
  ParentId: number;
  Label: string;
  Type : number;
  Name :string;
  StartDate: Date;
  EndDate :Date;
  Duration : number;
  Progress : number;
  IsUnscheduled: boolean;
  StaffInTask : StaffInTask[];
}

import { StaffInTask } from "./staffintask.entity";

export class Staff {
  Id: number;
  FullName: string;
  ShortName: string;
  StaffInTask : StaffInTask[];
}

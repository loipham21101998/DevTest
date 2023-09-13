import { Component ,OnInit} from '@angular/core';
import { StaffService } from '../service/staff.service';
import { Staff } from '../entites/staff.entity';
import { Task } from '../entites/task.entity';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  staffs : Staff[];
  task : Task[];
  json :string;
  constructor(
    private staffService:StaffService,
  ){}


  ngOnInit(): void {
    this.staffService.GetAllStaff().then(
      res => {
      debugger;
        this.staffs = res as Staff[];
      },
      err => {
        debugger;
        console.log(err);
      }
    );

 }

 Edit(){

 }


 Delete(){

 }
}

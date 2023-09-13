import { Component , ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Staff } from '../entites/staff.entity';
import { StaffService } from '../service/staff.service';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit{
  staffForm : FormGroup;
  staffs : Staff[];
  staff: Staff;
  StaffID :number;
  valueBtn : string;
  constructor(
    private emlementRef : ElementRef,
    private formBuilder : FormBuilder,
    private router: Router,
    private staffService: StaffService,
  ){}
  ngOnInit(): void {
    this.staffForm = this.formBuilder.group({
      Id:'',
      FullName:'',
      ShortName: '',
      StaffInTask :[]
    });

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
    this.valueBtn = "Create";
    this.StaffID = 0
  }
  CreateStaff(id:number){
    let staff :Staff = this.staffForm.value;
    if(this.valueBtn == "Create"){
      debugger;
      this.staffService.CreateStaff(staff).then(
        res => {
          console.log(res)
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
        },
        err=>{
          console.log(err)
        }

      )
    }else{
      this.staffService.UpdateStaffByID(id,staff).then(
        res=>{
          console.log(res);
          this.staffForm = this.formBuilder.group({
            Id: '',
            FullName:'',
            ShortName:''
          });
          this.valueBtn = "Create"
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
        },
        err=>{
          console.log(err)
        }
      )
    }


  }
  Edit(id:number){
    this.staffService.FindStaffByID(id).then(
      res => {
        this.staff = res as Staff;
        this.staffForm = this.formBuilder.group({
          Id: this.staff.Id,
          FullName:this.staff.FullName,
          ShortName: this.staff.ShortName
        });
        this.valueBtn = "Update"
        this.StaffID = this.staff.Id;
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
      },
      err=>{
        console.log(err)
      }
    )

  }


  Delete(id:number){
    this.staffService.DeleteStaffByID(id).then(
      res => {
        this.staffForm = this.formBuilder.group({
          Id: '',
          FullName:'',
          ShortName:''
        });
        this.valueBtn = "Create"
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
      },
      err=>{
        console.log(err)
      }
    )
  }
}

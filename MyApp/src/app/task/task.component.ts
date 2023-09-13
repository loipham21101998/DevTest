import { Component  , ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../entites/task.entity';
import { TaskService } from '../service/task.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm : FormGroup;
  tasks:Task[];
  constructor(
    private emlementRef : ElementRef,
    private formBuilder : FormBuilder,
    private taskService : TaskService
  ){}

  ngOnInit(): void {
     this.taskForm = this.formBuilder.group({
        Id:'',
        ParentId:'1',
        Label: 'Task1',
        Type:'',
        Name:'',
        StartDate:new Date(),
        EndDate: new Date(),
        Duration:'',
        Progress:'',
        IsUnscheduled: false
     });

     this.taskService.GetAllTask().then(
      res=>{
       this.tasks= res as Task[];
      },
      err=>{
        console.log(err)
      }

    );

  }

CreateTask(){
  let task :Task = this.taskForm.value;
  console.log(task);
  this.taskService.CreateTask(task).then(
    res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    }

  );
}

}

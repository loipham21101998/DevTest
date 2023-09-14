import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Task } from '../entites/task.entity';
import { TaskService } from '../service/task.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  tasks: Task[];
  tasksAll: Task[];
  taskEdit: Task;
  selectedTask: number;
  valueBtn: string;
  TaskID: number;
  constructor(
    private emlementRef: ElementRef,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private config: NgSelectConfig,
    private datePipe : DatePipe
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      Id: '',
      ParentId: '1',
      Label: 'Task1',
      Type: '',
      Name: '',
      StartDate: new Date(),
      EndDate: new Date(),
      Duration: '',
      Progress: '',
      IsUnscheduled: false,
    });
    this.valueBtn = 'Create';
    this.GetTask();
    this.TaskID = 0;
  }

  selectChange(id: number = null) {
    debugger;
    if (id != null) {
      this.GetTask();
    } else {
      if (this.selectedTask > 0) {
        if (this.tasks.length == 1) {
          this.tasks = this.tasksAll;
        }
        this.tasks = this.tasks.filter((x) => x.Id == this.selectedTask);
        //this.GetTask(this.selectedTask);
      }
    }
  }

  GetTask() {
    this.taskService.GetAllTask().then(
      (res) => {
        this.tasksAll = res as Task[];
        this.tasks = this.tasksAll;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  CreateTask(id: number) {
    if (this.TaskID != 0) {
      let task: Task = this.taskForm.value;
      this.taskService.UpdateTask(id, task).then(
        (res) => {
          this.taskForm = this.formBuilder.group({
            Id: '',
            ParentId: '',
            Label: '',
            Type: '',
            Name: '',
            StartDate: '',
            EndDate: '',
            Duration: '',
            Progress: '',
            IsUnscheduled: '',
          });
          this.GetTask();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      let task: Task = this.taskForm.value;
      console.log(task);
      this.taskService.CreateTask(task).then(
        (res) => {
          console.log(res);
          this.GetTask();
          this.taskForm = this.formBuilder.group({
            Id: '',
            ParentId: '',
            Label: '',
            Type: '',
            Name: '',
            StartDate: '',
            EndDate: '',
            Duration: '',
            Progress: '',
            IsUnscheduled: '',
          });
        },
        (err) => {
          console.log(err);
        }
      );

    }
  }

  Edit(id: number) {
    this.taskService.FindTaskById(id).then(
      (res) => {
        this.taskEdit = res as Task;
        this.taskForm = this.formBuilder.group({
          Id: this.taskEdit.Id,
          ParentId: this.taskEdit.ParentId,
          Label: this.taskEdit.Label,
          Type: this.taskEdit.Type,
          Name: this.taskEdit.Name,
          StartDate: this.datePipe.transform(this.taskEdit.StartDate,'yyyy-MM-dd').toString(),
          EndDate: this.datePipe.transform(this.taskEdit.EndDate,'yyyy-MM-dd').toString(),
          Duration: this.taskEdit.Duration,
          Progress: this.taskEdit.Progress,
          IsUnscheduled: this.taskEdit.IsUnscheduled,
        });
        this.valueBtn = 'Update';
      },
      (err) => {
        console.log(err);
      }
    );
    this.TaskID = id;
  }

  Delete(id: number) {
    this.taskService.DeleteTaskById(id).then(
      (res) => {
        console.log(res);
        this.GetTask();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

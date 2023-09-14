import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { gantt, GanttStatic} from 'dhtmlx-gantt';
import { TaskService } from '../service/task.service';
import { Task } from '../entites/task.entity';
import { Task1} from '../models/task';
import { DatePipe } from '@angular/common';
@Component({
  encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit{
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
  // tasks1 = {
  //   data: [
  //     {
  //       id: "10",
  //       text: "Project #1",
  //       start_date: "01-04-2025",
  //       duration: 3,
  //       order: 10,
  //       progress: 0.4,
  //       open: true,
  //     },
  //     {
  //       id: "1",
  //       text: "Task #1",
  //       start_date: "01-04-2025",
  //       duration: 1,
  //       order: 10,
  //       progress: 0.6,
  //       parent: "10",
  //     },
  //     {
  //       id: "2",
  //       text: "Task #2",
  //       start_date: "02-04-2025",
  //       duration: 2,
  //       order: 20,
  //       progress: 0.6,
  //       parent: "10",
  //     },
  //   ],
  //   links: [{ id: 1, source: 1, target: 2, type: "0" }],
  // };
  tasks1:Task1;
  tasks3:object;
  task2:Task1[]=[];
  tasks: Task[];
  private _gantt?: GanttStatic;
  constructor(
    private taskService :TaskService,
    private datePipe : DatePipe
  ){

  }

  ngOnInit(){
    this.taskService.GetAllTask().then(
        res => {
          debugger;
            this.tasks = res as Task[];
            for(var i = 0;i<this.tasks.length;i++){
              this.tasks1 = {
                id:this.tasks[i].Id,
                text: this.tasks[i].Label.toString().trim(),
                start_date: this.datePipe.transform(this.tasks[i].StartDate,'yyyy-MM-dd')?.toString(),
                duration: Number(this.tasks[i].Duration.toString().trim()),
                progress: Number(this.tasks[i].Progress.toString().trim()),
                parent: this.tasks[i].ParentId
              }
              this.task2.push(this.tasks1);
            }
            this.tasks3 = {
                data : this.task2,
                links: [{ id:1, source: 1, target: 2, type: "0" }],
            }
            console.log( this.tasks3);
            gantt.config.date_format = '%Y-%m-%d %H:%i';
            gantt.init(this.ganttContainer.nativeElement);
            gantt.parse(this.tasks3);

        },
        err => {
          console.log(err)
        }
    )


      // let gantt = Gantt.getGanttInstance();
      // gantt.init(this.ganttContainer.nativeElement);
      // gantt.parse(this.tasks);

      this._gantt = gantt;
  }
}

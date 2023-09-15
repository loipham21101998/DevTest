import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { gantt, GanttStatic } from 'dhtmlx-gantt';
import { TaskService } from '../service/task.service';
import { Task } from '../entites/task.entity';
import { Task1 } from '../models/task';
import { DatePipe } from '@angular/common';
import { TaskChart } from '../entites/taskchart.entity';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt',
  styleUrls: ['./gantt.component.css'],
  template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
  tasks12 = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  tasks1: TaskChart;
  tasks3: object;
  task2: TaskChart[];
  tasks: Task[];
  //private _gantt?: GanttStatic;
  constructor(
    private taskService: TaskService,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit() {
    this.task2 = [];
    gantt.config.date_format = '%Y-%m-%d %H:%i';
    gantt.init(this.ganttContainer.nativeElement);
    if(!(gantt as any).$_initOnce){
      (gantt as any).$_initOnce = true;

      const dp = gantt.createDataProcessor({
          task: {
              update: ( data: TaskChart) => this.taskService.UpdateTaskChart(data),
              create: (data: TaskChart) => this.taskService.InsertTaskChart(data),
              delete: (id: any) => this.taskService.DeleteTaskById(id),
          },
          // link: {
          //     update: (data: Link) => this.linkService.update(data),
          //     create: (data: Link) => this.linkService.insert(data),
          //     delete: (id: any) => this.linkService.remove(id),
          // }
      });
  }
    Promise.all([this.taskService.GetAllTask()]).then(
      ([data]) => {
        this.tasks = data as Task[];
        this.tasks.forEach(x => {
          let taskChart: TaskChart = {
            id: x.Id,
            text: x.Label.toString().trim(),
            start_date: this.datePipe.transform(x.StartDate, 'yyyy-MM-dd')?.toString(),
            duration: x.Duration,//Number(x.Duration.toString().trim()),
            progress:x.Progress.toString(), //Number(x.Progress.toString().trim()),
            parent: x.ParentId
          }
          console.log(taskChart)
          this.task2.push(taskChart)
        })
        var tasks = this.task2;
        console.log({tasks});
        gantt.parse({ tasks });
        console.log(this.tasks12);
        //gantt.parse(this.tasks12);

      },
      
    )
    gantt.init(this.ganttContainer.nativeElement);


    // let gantt = Gantt.getGanttInstance();
    // gantt.init(this.ganttContainer.nativeElement);
    // gantt.parse(this.tasks);

    //this._gantt = gantt;
  }
}

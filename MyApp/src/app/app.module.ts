import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffService } from './service/staff.service';
import { TaskService } from './service/task.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GanttComponent } from './gantt/gantt.component';
import { HttpClientModule } from '@angular/common/http';
import { StaffComponent } from './staff/staff.component';
import { TaskComponent } from './task/task.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GanttComponent,
    StaffComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [StaffService,TaskService,DatePipe],
  bootstrap: [HomeComponent]
})
export class AppModule { }

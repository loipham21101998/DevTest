import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Task } from "../entites/task.entity";
@Injectable()
export class TaskService
{

  private BASE_URL :string ="https://localhost:44368/api/Task/";

  constructor(
    private httpClient : HttpClient
  ){ }

 async GetAllTask(){
    let value = this.httpClient.get(this.BASE_URL+"Task");
    return await lastValueFrom(value) ;
  }

  async GetAllTask1(){
    let value = this.httpClient.get(this.BASE_URL+"Task1");
    return await lastValueFrom(value) ;
  }


  async CreateTask(task:Task){
    let value = this.httpClient.post(this.BASE_URL+"Task",task);
    return await lastValueFrom(value) ;
  }



}

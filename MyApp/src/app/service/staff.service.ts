import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Staff } from "../entites/staff.entity";
@Injectable()
export class StaffService
{

  private BASE_URL :string ="https://localhost:44368/api/Staff/";

  constructor(
    private httpClient : HttpClient
  ){ }


 async GetAllStaff(){
    let value = this.httpClient.get(this.BASE_URL+"Staff");
    return await lastValueFrom(value) ;
  }

  async CreateStaff(staff:Staff){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    var strRegisCus = JSON.stringify(staff);
    let value = this.httpClient.post<Staff>(this.BASE_URL+"Staff", strRegisCus, httpOptions)
    //let value = this.httpClient.post(this.BASE_URL+"Staff",staff);
    return await lastValueFrom(value) ;
  }

  async FindStaffByID(id:number){
    let value = this.httpClient.get(this.BASE_URL+"Staff?id="+id);
    return await lastValueFrom(value) ;;
  }

  async DeleteStaffByID(id:number){
    let value = this.httpClient.delete(this.BASE_URL+"Staff/"+id);
    return await lastValueFrom(value) ;;
  }
  async UpdateStaffByID(id:number,staff:Staff){
    let value = this.httpClient.put(this.BASE_URL+"Staff/"+id,staff);
    return await lastValueFrom(value) ;;
  }
}

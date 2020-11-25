import { ProjectDetail } from '../models/project-detail.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  formData: ProjectDetail;
  list: ProjectDetail[] = [];
  readonly rootUrl = environment.rootUrl + "/api/Projects/"//"https://tasker2.azurewebsites.net/api/Projects/"

  constructor(private http: HttpClient) { }

  post(){
    return this.http.post(this.rootUrl, this.formData)
  }

  put(){
    return this.http.put(this.rootUrl + this.formData.ProjectId, this.formData)
  }

  delete(id: number){
    return this.http.delete(this.rootUrl+id)
  }

  get(){
    return this.http.get(this.rootUrl).toPromise()
    .then((res: ProjectDetail[]) =>{
      this.list = res
    })
  }

  //populate edit form
  edit(data: ProjectDetail, edit: boolean){
    data.Date = (new Date(data.Date).toISOString().slice(0, 10)) as unknown as Date
    if(edit) this.formData = Object.assign({}, data)
    else this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.resetForm();
    }
    this.formData={
      ProjectId: 0,
      Date: null,
      Title: "",
      Description: null
    }
  }

  sort() {
    this.list.sort((a: ProjectDetail, b: ProjectDetail) => {
      return +new Date(a.Date) - +new Date(b.Date)
    })
  }
}

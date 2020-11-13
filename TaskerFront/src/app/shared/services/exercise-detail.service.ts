import { ExerciseDetail } from '../models/exercise-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDetailService {
  formData: ExerciseDetail;
  list: ExerciseDetail[];
  readonly rootUrl =  environment.rootUrl + "/api/Exercises/" //"https://tasker2.azurewebsites.net/api/Exercises/"

  constructor(private http: HttpClient) { }

  post(){
    return this.http.post(this.rootUrl, this.formData)
  }

  put(){
    return this.http.put(this.rootUrl + this.formData.ExerciseId, this.formData)
  }

  delete(id: number){
    return this.http.delete(this.rootUrl+id)
  }

  get(id: number){
    return this.http.get(this.rootUrl+id)
  }

  refreshList(){
    this.http.get(this.rootUrl).toPromise()
    .then(res => this.list = res as ExerciseDetail[])
  }
}

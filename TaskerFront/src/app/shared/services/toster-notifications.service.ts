import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TosterNotificationsService {

  constructor(private toastr: ToastrService) { }

  create(item: string){
    this.toastr.success(item + " created successfully");
  }

  update(item: string) {
    this.toastr.info(item + " updated successfully");
  }

  delete(item: string){
    this.toastr.warning(item + " deleted succesfully");
  }
}

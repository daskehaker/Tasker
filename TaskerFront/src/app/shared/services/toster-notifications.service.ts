import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TosterNotificationsService {

  constructor(private toastr: ToastrService) { }

  create(item: string){
    this.toastr.success(item + ' created successfully');
  }

  update() {
    this.toastr.info('Exercise Updated successfully');
  }

  delete(){
    this.toastr.warning("Deleted succesfully");
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  myDate = new Date();
  set myDateValue(value) {
    this.makeDirty(value);
  };
  appointments:any =[];
  constructor(public apiService:ApiService) { }

  ngOnInit(): void {
    console.log(this.myDate.getDate())
    this.getAppointment();
  }

  getAppointment(){
    this.apiService.getAppointments({ slot_date: this.myDate.getDate() }).subscribe(data=>{
      this.appointments = data.data;
      console.log(data);
    })
  }
  onChange(){
    console.log(this.myDate);
    this.getAppointment();
  }
  makeDirty(value) {
    console.log(value);

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getAppointments(data){
    return this.http.post<any>(environment.baseUrl + 'appointment/appointment_list', data)
      .pipe(map(data => {
        console.log(data);
        return data;
      })
      );
  }
  getSlots(data) {
    return this.http.post<any>(environment.baseUrl + 'slots/slot_list', data)
      .pipe(map(data => {
        console.log(data);
        return data;
      })
      );
  }
  postAppointments(data) {
    return this.http.post<any>(environment.baseUrl + 'appointment/add_appointment', data)
      .pipe(map(data => {
        console.log(data);
        return data;
      })
      );
  }
  postSlots(data) {
    return this.http.post<any>(environment.baseUrl + 'slots/add_slot', data)
      .pipe(map(data => {
        console.log(data);
        return data;
      })
      );
  }
}


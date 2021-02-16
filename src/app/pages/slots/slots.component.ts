import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {

  myDate = new Date();
  slotList :any =[];
  set myDateValue(value) {
    this.makeDirty(value);
  };
  constructor(public dialog: MatDialog , public apiService:ApiService) { }

  ngOnInit(): void {
    this.getSlots();

  }
  onChange() {
    console.log(this.myDate);
    this.getSlots();

  }
  makeDirty(value) {
    console.log(this.myDate)
    this.getSlots();
  }

  getSlots(){
    this.apiService.getSlots({ slot_date: this.myDate.getDate() }).subscribe(data => {
      this.slotList = data.data;
      console.log(data);
    })
    console.log(this.myDate.getDate())
  }

  addSlot(slotType){
    const dialogRef = this.dialog.open(AddSlotDialogue, {
      width: '400px',
      data: { schedule: slotType, date: this.myDate.getDate()}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSlots();
    });
  }

  addAppointment(slot) {
    const dialogRef = this.dialog.open(AddAppoinmentDialogue, {
      width: '400px',
      data: { slot: slot, date: this.myDate.getDate() }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getSlots();
    });
  }
}







@Component({
  selector: 'add-slot',
  templateUrl: 'add-slot.html',
})
export class AddSlotDialogue implements OnInit {
  slotForm: FormGroup;
  selectedTime: any;
  constructor(
    public dialogRef: MatDialogRef<AddSlotDialogue>, @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, public apiService: ApiService) { }
    time = { hour: 13, minute: 30 };
  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.slotForm = this.formBuilder.group({
      from_time: new FormControl('', [Validators.required, Validators.email]),
      to_time: new FormControl('', [Validators.required]),
      slot_date: new FormControl(this.data.date, [Validators.required]),
      slot_schedule: new FormControl(this.data.schedule, [Validators.required]),
    });
  }

  onChange(){
    console.log(this.selectedTime)
   let hour =  this.selectedTime.split(':');
   if(this.data.schedule == 'morning'){
     if ((hour[0] >= '09') && (hour[0] < '12')) {
       var hourTime = parseInt(hour[0]);
       var minTime = parseInt(hour[1]);
       let minutes = hourTime * 60 + minTime + 30;
       this.slotForm.value.from_time = this.selectedTime;
      this.slotForm.value.to_time= this.timeConvert(minutes);
      this.saveSlot();
     }
     else{
       alert('kindly choose between 9:00am to 11:30am')
     }
   }
   else{
     if ((hour[0] >= '17') && (hour[0] < '20')) {
       var hourTime = parseInt(hour[0]);
       var minTime = parseInt(hour[1]);
       let minutes = hourTime * 60 + minTime + 30;
       this.slotForm.value.from_time = this.selectedTime;
       this.slotForm.value.to_time = this.timeConvert(minutes);
       console.log(this.slotForm);
       this.saveSlot();
     }
     else {
       alert('kindly choose between 5:00pm to 8:30pm')
     }
   }
    
  }
  saveSlot() {
    this.apiService.postSlots(this.slotForm.value).subscribe(data =>{
      if (data.message === 'Success'){
        this.dialogRef.close();
      }
      else{
        alert(data.message)
      }

    })

  }

  timeConvert(n) {
    console.log(n);
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    console.log(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return  rhours + ":" + rminutes ;
}

}








@Component({
  selector: 'add-appointment',
  templateUrl: 'add-appointment.html',
})
export class AddAppoinmentDialogue implements OnInit {
  appointmentForm: FormGroup;
  selectedTime: any;
  constructor(
    public dialogRef: MatDialogRef<AddAppoinmentDialogue>,public router:Router, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public apiService: ApiService) { }
  time = { hour: 13, minute: 30 };
  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      patient_name: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [Validators.required]),
      slot: new FormControl(this.data.slot._id, [Validators.required]),
      appointment_date: new FormControl(this.data.date, [Validators.required]),
      appointment_time: new FormControl(this.data.slot.from_time, [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
  }
  saveAppointment() {
    this.apiService.postAppointments(this.appointmentForm.value).subscribe(data => {
      if (data.message === 'Success') {
        this.dialogRef.close();
        this.router.navigateByUrl('/dashboard');
      }
      else {
        alert(data.message)
      }

    })

  }

}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlotsRoutingModule } from './slots-routing.module';
import { AddAppoinmentDialogue, AddSlotDialogue, SlotsComponent } from './slots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';



@NgModule({
  declarations: [SlotsComponent, AddSlotDialogue, AddAppoinmentDialogue],
  imports: [
    CommonModule,
    SlotsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    MaterialModule,
    NgxMatTimepickerModule,
    NgbModule
  ]
})
export class SlotsModule { }

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ReservationService} from '../../services/reservation.service';
import { UpdateReservationsService } from '../../services/update-reservations.service';
import { Reservation } from '../../models/Reservation';
import { DataSource } from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit {

  @Input() indexOf;
  @Input() reservation: Reservation;
  @Output() reservationSelected = new EventEmitter<void>();
  
  constructor(private reservationService: ReservationService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              public updateReservationsService: UpdateReservationsService) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onSelected(){
  this.updateReservationsService.index = this.indexOf;
  this.reservationSelected.emit();
  }
}

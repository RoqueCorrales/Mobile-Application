import { Component } from '@angular/core';
import { AirportService } from '../../Services/airport.service';
import { Airport } from '../../Models/airport.model';
import { LoaderService } from '../../Services/loader.service';


@Component({
  selector: 'app-airport-listing',
  templateUrl: './airport-listing.page.html',
  styleUrls: ['./airport-listing.page.scss'],
})

export class AirportListingPage {

  airports: Airport[];


  constructor(private airportService: AirportService, private loader: LoaderService) {
    this.getAirports();
  }

  private getAirports() {
    this.loader.presentLoading();
    this.airportService.getActiveAirports().subscribe((airports: Airport[]) => {
      this.airports = airports;
      this.loader.dismissLoading();
    }, () => {
      console.log('error');
    });
  }

  ionViewDidEnter() {
    if(this.airports && this.airports.length === 0) this.getAirports();
  }
  
}

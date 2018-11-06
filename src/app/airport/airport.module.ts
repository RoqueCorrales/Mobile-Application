import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AirportService } from '../Services/airport.service';
import { AirportListingPage } from './airport-listing/airport-listing.page';
import { LoaderService } from '../Services/loader.service';

const routes: Routes = [
    {
      path: '',
      component: AirportListingPage
    }
  ];


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        AirportService,
        LoaderService
    ],
    declarations: [
        AirportListingPage
    ]
})
export class AirportPageModule {}
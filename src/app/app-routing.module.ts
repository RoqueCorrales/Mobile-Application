import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirportListingPage } from './airport/airport-listing/airport-listing.page';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'airport' , loadChildren: './airport/airport.module#AirportPageModule'},
  { path: 'Login', loadChildren: './login/login.module#LoginPageModule' },
  { path: '', redirectTo: 'Login', pathMatch: 'full' }
];

// const routes: Routes = [
//   {
//     path: 'home',
//     component: HomePage,
//     children: [
//       { path: '', redirectTo: 'Login', pathMatch: 'full' },
//       { path: 'home', loadChildren: './home/home.module#HomePageModule' },
//       { path: 'Login', loadChildren: './login/login.module#LoginPageModule' },
//       {
//         path: 'airport',
//         outlet: 'airport',
//         component: AirportListingPage
//       }
//     ]
//   }
// ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

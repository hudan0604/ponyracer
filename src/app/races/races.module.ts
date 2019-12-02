import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesComponent } from '../races/races.component';
import { RaceComponent } from '../race/race.component';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../from-now.pipe';
import { BetComponent } from '../bet/bet.component';
import { LiveComponent } from '../live/live.component';
import { PendingRacesComponent } from '../races/pending-races/pending-races.component';
import { FinishedRacesComponent } from '../races/finished-races/finished-races.component';
import { RouterModule } from '@angular/router';
import { RACES_ROUTES } from './races.routes';


@NgModule({
  declarations: [
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    BetComponent,
    LiveComponent,
    PendingRacesComponent,
    FinishedRacesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RACES_ROUTES)
  ], 
})
export class RacesModule { }

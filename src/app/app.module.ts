import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './race/race.component';
import { PonyComponent } from './pony/pony.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FromNowPipe } from './from-now.pipe';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';
import { PendingRacesComponent } from './races/pending-races/pending-races.component';
import { FinishedRacesComponent } from './races/finished-races/finished-races.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BetComponent,
    LiveComponent,
    PendingRacesComponent,
    FinishedRacesComponent
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, RouterModule.forRoot(ROUTES)],
  providers: [{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}

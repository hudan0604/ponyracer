import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, concat, of, EMPTY } from 'rxjs';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  userEventsSubscription: Subscription;
  user: UserModel;
  constructor(private userService: UserService) { }

  navbarCollapsed = true;

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  logout(): void {
    this.userService.logout();
  }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents
      .pipe(switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null))))
      .subscribe(userWithScore => (this.user = userWithScore));
  }



  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
}

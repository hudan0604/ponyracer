import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  userEventsSubscription: Subscription;
  user: UserModel;
  constructor(private userService: UserService) {}

  navbarCollapsed = true;

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  logout(): void {
    this.userService.logout();
  }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
  }

  ngOnDestroy() {
    if (this.userEventsSubscription) {
      this.userEventsSubscription.unsubscribe();
    }
  }
}

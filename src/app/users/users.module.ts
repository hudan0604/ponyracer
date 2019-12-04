import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { USERS_ROUTES } from './users.routes';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MoneyHistoryComponent } from './money-history/money-history.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(USERS_ROUTES)],
  declarations: [RegisterComponent, LoginComponent, MoneyHistoryComponent]
})
export class UsersModule {}

import { Component, OnInit } from '@angular/core';
import { User } from '../_model/user';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  user: User;
  constructor(
      private userService: UserService) {
  }

  ngOnInit(): void {
      this.getCurrentUser();
  }

  getCurrentUser(): void {
       this.userService.getCurrentUser().subscribe(user => this.user = user);
  }
}

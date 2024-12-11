import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../_services/user.service';
import { response } from 'express';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  message: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void { 
    this.forUser();
  }

  forUser() {
    this.userService.forUser().subscribe({
      next: (response: any) => {
        console.log(response);
        this.message = response;
      },
      error: (error) => {
        console.log(error);
      }
    }
    )
  }
}

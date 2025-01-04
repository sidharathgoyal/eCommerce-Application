import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    standalone: false
})
export class UserComponent implements OnInit {

  message:any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  // forUser() {
  //   this.userService.forUser().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.message = response;
  //     }, 
  //     (error)=>{
  //       console.log(error);
  //     }
  //   );
  // }

  forUser(){
    this.userService.forUser().subscribe({
      next: (response: any) => {
        console.log(response);
        this.message = response;
      },
    error: (error: HttpErrorResponse) => {
      console.log(error);
    }
    });
  }
}

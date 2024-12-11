import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userAuthService: UserAuthService, 
    private router: Router,
    private cdRef: ChangeDetectorRef, // Inject ChangeDetectorRef
    public  userService: UserService
  ) {}

  ngOnInit(): void {
    // Log to verify if ngOnInit is being triggered
  }

  // public isLoggedIn(): boolean {
  //   // Ensure that the token is being checked
  //   if(this.userAuthService.isLoggedIn() === null){
  //     return false;
  //   }
  //   return true;
  // }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

  // Manually trigger change detection after login
  public checkLoginState(): void {
    this.cdRef.detectChanges();
  }
}

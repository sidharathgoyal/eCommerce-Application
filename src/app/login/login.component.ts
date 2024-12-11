import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private userAuthService: UserAuthService, 
    private router:Router, private cdRef: ChangeDetectorRef ){}

  ngOnInit(): void { 
  }

  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe({
      next: (response:any) => {

        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.user.role);
 
        console.log(response);
        const role = response.user.role[0].roleName;
        if(role === 'Admin'){
          this.router.navigate(["/admin"])
        }
        else{
          this.router.navigate(["/user"])
        }
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}

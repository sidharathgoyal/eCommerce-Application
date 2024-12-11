import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userAuthService: UserAuthService, private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // throw new Error("Method not implemented.");
       
       if(req.headers.get("No-Auth") === 'True'){
        return next.handle(req.clone());
       }

    //   console.log("Intercepting request to:", req.url);

       const token = this.userAuthService.getToken();
       console.info("Token being added to the request:", token);
       req = this.addToken(req, token);

       return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401){
                    this.router.navigate(['/login']);
                }
                else if(err.status === 403){
                    this.router.navigate(['/forbidden']);
                }
                return throwError("Something is wrong!!");
            }
        )
       );
    }

    private addToken(request:HttpRequest<any>, token:string|null){
        const clonedRequest = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        console.info("Request with token:", clonedRequest);
        return clonedRequest;
    }
    
}
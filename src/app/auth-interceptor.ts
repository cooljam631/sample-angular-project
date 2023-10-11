import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor {
    constructor(private authService:AuthService){}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const credentials = this.authService.getCredentials();
        console.log('credentials', credentials);
        if(credentials){
            request = request.clone({
                setHeaders:{
                    Authorization: 'Basic ' + btoa(credentials.username + ":" + credentials.password),
                },
            });
        }
        return next.handle(request);
    }
}

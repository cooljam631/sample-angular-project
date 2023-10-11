import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

        canActivate(): boolean {
            console.log(this.authService.getCredentials());
            if(this.authService.isLoggedIn()){
            return true;
        } else{
            console.log('failed');
            this.router.navigate(['/login']);
            return false;
        }
    }
}

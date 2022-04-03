import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable, ReplaySubject, tap } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root"
})
export class AuthSystemGuard implements CanActivateChild {
    constructor(private auth: AuthService, private router: Router) {}

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        let isAuth: boolean = false;

        this.auth.isAuth$.subscribe({
            next: res => {
                isAuth = res;
            }
        });

        if (!isAuth) return true;
        else this.router.navigateByUrl("/account");

        return false;
    }
}

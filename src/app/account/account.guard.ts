import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable, ReplaySubject, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root"
})
export class AccountGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
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

        if (isAuth) return true;
        else this.router.navigateByUrl("/auth/login");

        return false;
    }
}

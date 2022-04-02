import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable, ReplaySubject } from "rxjs";
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
        let is: ReplaySubject<boolean> = new ReplaySubject<boolean>();

        this.auth.isAuth$.subscribe({
            next: res => {
                if (!res) this.router.navigateByUrl("/auth/login");
                else is.next(true);
            }
        });

        return is.asObservable();
    }
}

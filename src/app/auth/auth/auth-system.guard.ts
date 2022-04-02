import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { Observable, ReplaySubject } from "rxjs";
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
        let is: ReplaySubject<boolean> = new ReplaySubject<boolean>();

        this.auth.isAuth$.subscribe({
            next: res => {
                if (res) this.router.navigateByUrl("/account");
                else is.next(true);
            }
        });

        return is.asObservable();
    }
}

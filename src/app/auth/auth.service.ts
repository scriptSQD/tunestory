import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReplaySubject } from "rxjs";
import { setCmsContext } from "./CmsContext";
import { User } from "./interfaces/user.interface";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    isAuth$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    jwt: string | null = localStorage.getItem("token");
    user$: ReplaySubject<User | undefined> = new ReplaySubject<
        User | undefined
    >();

    constructor(private http: HttpClient) {
        if (!this.jwt) {
            this.isAuth$.next(false);
            return;
        }

        http.get<User>("/users/me", {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.jwt}`
            }),
            context: setCmsContext()
        }).subscribe({
            next: (res): void => {
                this.user$.next(res);
                this.isAuth$.next(true);
            },
            error: (): void => {
                localStorage.removeItem("token");
                this.isAuth$.next(false);
            }
        });
    }

    updateLocalJwt(): void {
        this.jwt = localStorage.getItem("token");
    }

    getUser(): void {
        this.updateLocalJwt();

        this.http
            .get<User>("/users/me", {
                headers: new HttpHeaders({
                    Authorization: `Bearer ${this.jwt}`
                }),
                context: setCmsContext()
            })
            .subscribe({
                next: res => {
                    this.user$.next(res);
                },
                error: () => {}
            });
    }

    login(credentials: {
        identifier: string;
        password: string;
    }): ReplaySubject<boolean> {
        let result: ReplaySubject<boolean> = new ReplaySubject<boolean>();

        this.http
            .post<{ jwt: string; user: User }>(
                "/auth/local",
                {
                    identifier: credentials.identifier,
                    password: credentials.password
                },
                {
                    context: setCmsContext()
                }
            )
            .subscribe({
                next: res => {
                    this.isAuth$.next(true);
                    localStorage.setItem("token", res.jwt);
                    this.getUser();
                    result.next(true);
                },
                error: err => {
                    result.error(err.error);
                }
            });
        return result;
    }

    logout() {
        this.isAuth$.next(false);
        localStorage.removeItem("token");
        this.jwt = null;
        this.user$.next(undefined);
    }

    signup(data: { username: string; email: string; password: string }) {
        let result: ReplaySubject<boolean> = new ReplaySubject<boolean>();

        this.http
            .post<{ jwt: string; user: User }>("/auth/local/register", data, {
                context: setCmsContext()
            })
            .subscribe({
                next: res => {
                    this.isAuth$.next(true);
                    localStorage.setItem("token", res.jwt);
                    this.getUser();
                    result.next(true);
                },
                error: err => {
                    result.error(err.error);
                }
            });

        return result;
    }
}

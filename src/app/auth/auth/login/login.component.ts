import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { AuthService } from "../../auth.service";
import { AuthError } from "../../interfaces/auth-failure.interface";

@Component({
    selector: "ts-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {}

    login: FormGroup = this.fb.group({
        identifier: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]]
    });

    loginFailed: ReplaySubject<AuthError | null> =
        new ReplaySubject<AuthError | null>();
    isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    processLogin() {
        this.isLoading.next(true);
        this.loginFailed.next(null);

        let creds = {
            identifier: this.login.value.identifier,
            password: this.login.value.password
        };

        this.auth.login(creds).subscribe({
            next: () => {
                this.isLoading.next(false);
                this.loginFailed.next(null);
                this.router.navigateByUrl("/account");
            },
            error: err => {
                this.isLoading.next(false);
                this.loginFailed.next(err);
            }
        });
    }

    ngOnInit(): void {}
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { AuthService } from "../../auth.service";
import { AuthError } from "../../interfaces/auth-failure.interface";

@Component({
    selector: "ts-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router
    ) {}

    isLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    signupFailed: ReplaySubject<AuthError | null> =
        new ReplaySubject<AuthError | null>();

    signup: FormGroup = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        username: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(8)]]
    });

    processsignup() {
        this.isLoading.next(true);
        this.signupFailed.next(null);

        let payload = {
            email: this.signup.value.email,
            username: this.signup.value.username,
            password: this.signup.value.password
        };

        this.auth.signup(payload).subscribe({
            next: () => {
                this.isLoading.next(false);
                this.signupFailed.next(null);
                this.router.navigateByUrl("/account");
            },
            error: err => {
                this.isLoading.next(false);
                this.signupFailed.next(err);
            }
        });
    }

    ngOnInit(): void {}
}

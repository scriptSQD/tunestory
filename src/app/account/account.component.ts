import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "ts-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
    constructor(public auth: AuthService) {}

    ngOnInit(): void {}
}

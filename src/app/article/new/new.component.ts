import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "ts-new",
    templateUrl: "./new.component.html",
    styleUrls: ["./new.component.scss"]
})
export class NewComponent implements OnInit {
    constructor(private fb: FormBuilder) {}

    post: FormGroup = this.fb.group({
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        cover: [null],
        author: [null, [Validators.required]],
        body: [null, [Validators.required]]
    });

    ngOnInit(): void {}
}

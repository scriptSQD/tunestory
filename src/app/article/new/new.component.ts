import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/interfaces/user.interface";
import { ArticlesService } from "../articles.service";

@Component({
    selector: "ts-new",
    templateUrl: "./new.component.html",
    styleUrls: ["./new.component.scss"]
})
export class NewComponent implements OnInit, AfterViewInit {
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private as: ArticlesService
    ) {}

    publishing: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    failed: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    showPreview: boolean = false;
    togglePreview() {
        this.showPreview = !this.showPreview;
    }

    post: FormGroup = this.fb.group({
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        cover: [null],
        body: [null, [Validators.required]]
    });

    submitPost() {
        this.publishing.next(true);

        let user: User | undefined;

        this.auth.user$.subscribe({
            next: u => {
                user = u;
            }
        });

        this.as
            .postArticle(
                { ...this.post.value, user: { id: user!.id } },
                localStorage.getItem("token")!
            )
            .subscribe({
                next: () => {
                    this.publishing.next(false);
                    this.failed.next(false);
                },
                error: () => {
                    this.publishing.next(false);
                    this.failed.next(true);
                }
            });
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}
}

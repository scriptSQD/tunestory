import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/auth/interfaces/user.interface";
import { ArticlesService } from "../articles.service";
import { Article } from "../interfaces/article.interface";

@Component({
    selector: "ts-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ["./edit.component.scss"]
})
export class EditComponent implements OnInit {
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private as: ArticlesService,
        private route: ActivatedRoute
    ) {
        this.articleSlug = this.route.snapshot.params["slug"];
    }

    articleSlug!: string;
    article: ReplaySubject<Article> = new ReplaySubject<Article>();
    articleLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    articleNotFound: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    articleFailed: ReplaySubject<HttpErrorResponse> =
        new ReplaySubject<HttpErrorResponse>();

    publishing: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    failed: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    showPreview: boolean = false;
    togglePreview() {
        this.showPreview = !this.showPreview;
    }

    edition: FormGroup = this.fb.group({
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        cover: [null],
        body: [null, [Validators.required]]
    });

    submitEdit(id: number) {
        this.publishing.next(true);

        let user: User | undefined;

        this.auth.user$.subscribe({
            next: u => {
                user = u;
            }
        });

        this.as
            .editArticle(
                { ...this.edition.value, user: { id: user!.id } },
                localStorage.getItem("token")!,
                id
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

    ngOnInit(): void {
        this.articleLoading.next(true);
        this.as.article(this.articleSlug).subscribe({
            next: art => {
                if (!art) {
                    this.articleNotFound.next(true);
                    return;
                }
                this.article.next(art);
                this.articleLoading.next(false);
            },
            error: err => {
                this.articleFailed.next(err);
                this.articleLoading.next(false);
            }
        });

        this.article.subscribe({
            next: art => {
                this.edition.setValue({
                    title: art.title,
                    description: art.description,
                    cover: art.cover,
                    body: art.body
                });
            }
        });
    }
}

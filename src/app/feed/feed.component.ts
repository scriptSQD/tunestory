import { Component, OnInit } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { ArticlesService } from "../article/articles.service";
import { Article } from "../article/interfaces/article.interface";
import { AuthService } from "../auth/auth.service";

import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "ts-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
    constructor(
        private as: ArticlesService,
        public auth: AuthService,
        private fb: FormBuilder
    ) {}

    filters: FormGroup = this.fb.group({
        filter: ["asc", [Validators.required]]
    });

    applyFilter(filter: string) {
        if (filter === "desc") {
            this.articles = _.sortBy(this.articles, "publishedAt").reverse();
        } else if (filter === "asc") {
            this.articles = _.sortBy(this.articles, "publishedAt");
        }
    }

    articles?: Article[];
    loading: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    failed: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    ngOnInit(): void {
        this.loading.next(true);
        this.as.articles().subscribe({
            next: res => {
                this.articles = _.sortBy(res, "publishedAt").reverse();
                this.loading.next(false);
            },
            error: () => {
                this.articles = [];
                this.failed.next(true);
                this.loading.next(false);
            }
        });

        this.filters.valueChanges.subscribe(res => {
            this.applyFilter(res.filter[0]);
        });
    }
}

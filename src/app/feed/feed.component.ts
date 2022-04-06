import { Component, OnInit } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { ArticlesService } from "../article/articles.service";
import { Article } from "../article/interfaces/article.interface";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "ts-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
    constructor(private as: ArticlesService, public auth: AuthService) {}

    articles?: Article[];
    loading: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    failed: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    ngOnInit(): void {
        this.loading.next(true);
        this.as.articles().subscribe({
            next: res => {
                this.articles = res;
                this.loading.next(false);
            },
            error: () => {
                this.articles = [];
                this.failed.next(true);
                this.loading.next(false);
            }
        });
    }
}

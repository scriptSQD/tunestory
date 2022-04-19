import { Component, OnInit } from "@angular/core";
import _ from "lodash";
import { ReplaySubject, switchMap } from "rxjs";
import { ArticlesService } from "../article/articles.service";
import { Article } from "../article/interfaces/article.interface";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "ts-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
    constructor(public auth: AuthService, private as: ArticlesService) {}

    articles: ReplaySubject<Article[]> = new ReplaySubject<Article[]>();
    articlesLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    ngOnInit(): void {
        this.articlesLoading.next(true);
        this.auth.user$
            .pipe(
                switchMap(user => {
                    return this.as.articlesByUser(user!.id);
                })
            )
            .subscribe({
                next: arts => {
                    this.articles.next(_.sortBy(arts, "createdAt").reverse());
                    this.articlesLoading.next(false);
                }
            });
    }
}

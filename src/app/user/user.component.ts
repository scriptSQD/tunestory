import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import _ from "lodash";
import { ReplaySubject } from "rxjs";
import { ArticlesService } from "../article/articles.service";
import { Article } from "../article/interfaces/article.interface";
import { User } from "../auth/interfaces/user.interface";
import { UserService } from "./user.service";

@Component({
    selector: "ts-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
    constructor(
        private as: ArticlesService,
        private route: ActivatedRoute,
        private userservice: UserService
    ) {
        this.userId = this.route.snapshot.params["id"];
    }

    userId!: number;

    articles: ReplaySubject<Article[]> = new ReplaySubject<Article[]>();
    articlesLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    user: ReplaySubject<User> = new ReplaySubject<User>();
    userLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    userNotFound: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    userFailed: ReplaySubject<HttpErrorResponse> =
        new ReplaySubject<HttpErrorResponse>();

    ngOnInit(): void {
        this.articlesLoading.next(true);
        this.userLoading.next(true);
        this.userservice.userById(this.userId).subscribe({
            next: user => {
                if (!user) {
                    this.userNotFound.next(true);
                    return;
                }
                this.user.next(user);
                this.userLoading.next(false);
            },
            error: err => {
                this.userFailed.next(err);
                this.userLoading.next(false);
            }
        });
        this.as.articlesByUser(this.userId).subscribe({
            next: arts => {
                this.articles.next(_.sortBy(arts, "createdAt").reverse());
                this.articlesLoading.next(false);
            }
        });
    }
}

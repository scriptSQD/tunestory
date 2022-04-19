import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { ArticlesService } from "../articles.service";
import { Article } from "../interfaces/article.interface";

@Component({
    selector: "ts-view",
    templateUrl: "./view.component.html",
    styleUrls: ["./view.component.scss"]
})
export class ViewComponent implements OnInit, AfterViewInit {
    constructor(private route: ActivatedRoute, private as: ArticlesService) {}

    article?: Article;
    articleLoading: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    failed: ReplaySubject<HttpErrorResponse> =
        new ReplaySubject<HttpErrorResponse>();

    ngOnInit(): void {
        this.articleLoading.next(true);
        this.as.article(this.route.snapshot.params["slug"]).subscribe({
            next: res => {
                this.article = res;
                this.articleLoading.next(false);
            },
            error: err => {
                this.failed.next(err);
                this.articleLoading.next(false);
            }
        });
    }

    ngAfterViewInit(): void {}
}

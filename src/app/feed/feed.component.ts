import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { ArticlesService } from "../article/articles.service";
import { Article } from "../article/interfaces/article.interface";

@Component({
    selector: "ts-feed",
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
    constructor(private as: ArticlesService) {}

    articles: Article[] | null = [];
    loading: ReplaySubject<boolean> = new ReplaySubject<boolean>();

    ngOnInit(): void {
        this.loading.next(true);
        this.as.articles().subscribe({
            next: res => {
                this.articles = res.data;
                this.loading.next(false);
            },
            error: () => {
                this.articles = null;
                this.loading.next(false);
            }
        });
    }
}

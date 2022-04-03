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

    ngOnInit(): void {
        this.articleLoading.next(true);
        this.as.article(this.route.snapshot.params["slug"]).subscribe({
            next: res => {
                console.log(res);
                this.article = res.data[0];
                this.articleLoading.next(false);
            }
        });
    }

    ngAfterViewInit(): void {}
}

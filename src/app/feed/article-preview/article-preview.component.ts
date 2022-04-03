import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/article/interfaces/article.interface";

@Component({
    selector: "ts-article-preview",
    templateUrl: "./article-preview.component.html",
    styleUrls: ["./article-preview.component.scss"]
})
export class ArticlePreviewComponent implements OnInit {
    constructor() {}

    @Input("article") article!: Article;

    ngOnInit(): void {}
}

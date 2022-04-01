import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "ts-article-preview",
    templateUrl: "./article-preview.component.html",
    styleUrls: ["./article-preview.component.scss"]
})
export class ArticlePreviewComponent implements OnInit {
    constructor() {}

    @Input("article-header") index?: string;

    ngOnInit(): void {}
}

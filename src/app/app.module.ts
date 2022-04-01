import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TitleStrategy } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TitleStrat } from "./title-strat";
import { FeedComponent } from "./feed/feed.component";
import { HomeComponent } from "./home/home.component";
import { ArticlePreviewComponent } from './feed/article-preview/article-preview.component';
import { AccountComponent } from './account/account.component';

@NgModule({
    declarations: [AppComponent, FeedComponent, HomeComponent, ArticlePreviewComponent, AccountComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [{ provide: TitleStrategy, useClass: TitleStrat }],
    bootstrap: [AppComponent]
})
export class AppModule {}

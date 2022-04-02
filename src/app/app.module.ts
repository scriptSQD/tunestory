import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TitleStrategy } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TitleStrat } from "./title-strat";
import { FeedComponent } from "./feed/feed.component";
import { HomeComponent } from "./home/home.component";
import { ArticlePreviewComponent } from "./feed/article-preview/article-preview.component";
import { AccountComponent } from "./account/account.component";
import { AuthComponent } from "./auth/auth/auth.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CmsInterceptor } from "./cms.interceptor";
import { LoaderComponent } from "./loader/loader.component";
import { LoaderDirective } from "./loader/loader.directive";
import { LoginComponent } from "./auth/auth/login/login.component";
import { SignupComponent } from "./auth/auth/signup/signup.component";
import { ViewComponent } from "./article/view/view.component";
import { NewComponent } from "./article/new/new.component";
import { QuillModule } from "ngx-quill";

@NgModule({
    declarations: [
        AppComponent,
        FeedComponent,
        HomeComponent,
        ArticlePreviewComponent,
        AccountComponent,
        AuthComponent,
        LoaderComponent,
        LoaderDirective,
        LoginComponent,
        SignupComponent,
        ViewComponent,
        NewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        QuillModule.forRoot()
    ],
    providers: [
        { provide: TitleStrategy, useClass: TitleStrat },
        { provide: HTTP_INTERCEPTORS, useClass: CmsInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

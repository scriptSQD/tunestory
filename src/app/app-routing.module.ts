import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { FeedComponent } from "./feed/feed.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: HomeComponent, title: "Home" },
    { path: "feed", component: FeedComponent, title: "Feed" },
    { path: "account", component: AccountComponent, title: "Account" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

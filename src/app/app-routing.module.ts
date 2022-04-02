import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account/account.component";
import { AccountGuard } from "./account/account.guard";
import { NewComponent } from "./article/new/new.component";
import { ViewComponent } from "./article/view/view.component";
import { AuthSystemGuard } from "./auth/auth/auth-system.guard";
import { LoginComponent } from "./auth/auth/login/login.component";
import { SignupComponent } from "./auth/auth/signup/signup.component";
import { FeedComponent } from "./feed/feed.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home" },
    { path: "home", component: HomeComponent, title: "Home" },
    { path: "feed", component: FeedComponent, title: "Feed" },
    {
        path: "account",
        component: AccountComponent,
        title: "Account",
        canActivate: [AccountGuard]
    },
    {
        path: "auth",
        canActivateChild: [AuthSystemGuard],
        children: [
            {
                path: "",
                redirectTo: "login",
                pathMatch: "full"
            },
            { path: "signup", component: SignupComponent },
            { path: "login", component: LoginComponent }
        ]
    },
    {
        path: "articles",
        children: [
            { path: "new", component: NewComponent },
            {
                path: ":slug",
                component: ViewComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

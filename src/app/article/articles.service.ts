import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { setCmsContext } from "../auth/CmsContext";
import { Article } from "./interfaces/article.interface";

interface ArticlePubl {
    title: string;
    description: string;
    body: string;
    user: {
        id: number;
    };
}

@Injectable({
    providedIn: "root"
})
export class ArticlesService {
    constructor(private http: HttpClient) {}

    articles() {
        return this.http.get<{ data: Article[] }>("/articles?populate=*", {
            context: setCmsContext()
        });
    }

    article(slug: string): Observable<{ data: Article[] }> {
        return this.http.get<{ data: Article[] }>(
            `/articles?filters[slug]=${slug}&populate=*`,
            {
                context: setCmsContext()
            }
        );
    }

    postArticle(data: ArticlePubl, auth: string) {
        return this.http.post<Article>(
            "/articles",
            { data: data },
            {
                context: setCmsContext(),
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            }
        );
    }
}

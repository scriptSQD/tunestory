import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { withCache } from "@ngneat/cashew";
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
        return this.http.get<Article[]>("/articles?populate=*", {
            context: withCache({ context: setCmsContext() })
        });
    }

    article(slug: string): Observable<Article> {
        return this.http.get<Article>(`/slugify/slugs/article/${slug}`, {
            context: withCache({ context: setCmsContext() }),
            params: {
                populate: "*"
            }
        });
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

    editArticle(data: ArticlePubl, auth: string, id: number) {
        return this.http.put<Article>(
            `/articles/${id}`,
            { data: data },
            {
                context: setCmsContext(),
                headers: {
                    Authorization: `Bearer ${auth}`
                }
            }
        );
    }

    articlesByUser(id: number) {
        return this.http.get<Article[]>(`/articles/byUser/${id}`, {
            context: withCache({ context: setCmsContext() })
        });
    }
}

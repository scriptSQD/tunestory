import { User } from "src/app/auth/interfaces/user.interface";
import { Media } from "src/app/interfaces/Media.interface";

export interface Article {
    id: number;
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    cover: { data: Media };
    body: string;
    user: User;
}

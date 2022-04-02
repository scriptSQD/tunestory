import { Media } from "../../interfaces/Media.interface";
import { User } from "./user.interface";

export interface AuthorProfile {
    name: string;
    avatar: Media;
    email: string;
    articles: {};
    user: User;
}

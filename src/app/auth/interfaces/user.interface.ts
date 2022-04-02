import { AuthorProfile } from "./author-profile.interface";

export interface User {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    author: AuthorProfile;
}

export interface User {
    id: number;
    username: string;
    // email is present theoretically
    // but practivally not returned in the response
    // email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    article_author: boolean;
}

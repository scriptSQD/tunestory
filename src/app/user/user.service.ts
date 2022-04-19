import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { setCmsContext } from "../auth/CmsContext";
import { User } from "../auth/interfaces/user.interface";

@Injectable({
    providedIn: "root"
})
export class UserService {
    constructor(private http: HttpClient) {}

    userById(id: number): Observable<User> {
        return this.http.get<User>(`/users/${id}`, {
            context: setCmsContext()
        });
    }
}

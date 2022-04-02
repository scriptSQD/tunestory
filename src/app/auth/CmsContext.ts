import { HttpContext, HttpContextToken } from "@angular/common/http";

export const CmsContext: HttpContextToken<boolean> =
    new HttpContextToken<boolean>(() => {
        return false;
    });

export function setCmsContext() {
    return new HttpContext().set(CmsContext, true);
}

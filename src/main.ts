import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import * as Sentry from "@sentry/angular";
import { BrowserTracing } from "@sentry/tracing";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

Sentry.init({
    dsn: "https://c3a5bef6b7cf4a3aaf89500b3f9872ff@o1190516.ingest.sentry.io/6311589",
    integrations: [
        new BrowserTracing({
            tracingOrigins: [
                "localhost",
                "https://tunestory-strapi.herokuapp.com/api"
            ],
            routingInstrumentation: Sentry.routingInstrumentation
        })
    ],
    tracesSampleRate: 0.25
});

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { LoaderComponent } from "./loader.component";

@Directive({
    selector: "[loading]"
})
export class LoaderDirective {
    constructor(
        private tmpRef: TemplateRef<any>,
        private ref: ViewContainerRef
    ) {}

    @Input("loading") set isloading(val: any) {
        if (val) {
            this.ref.clear();
            let loader = this.ref.createComponent(LoaderComponent);
            loader.instance.styles = {
                margin: "0.5rem",
                width: "50px",
                aspectRatio: "1",
                borderColor: "#404040",
                borderTopColor: "#eee"
            };
        } else {
            this.ref.clear();
            this.ref.createEmbeddedView(this.tmpRef);
        }
    }
}

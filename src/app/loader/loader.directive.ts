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

    // styling inputs
    @Input("loadingStyles") s: {
        margin?: string;
        width?: string;
        aspectRatio?: string;
        borderColor?: string;
        borderTopColor?: string;
    } = {
        margin: "0.5rem",
        width: "50px",
        aspectRatio: "1",
        borderColor: "white",
        borderTopColor: "black"
    };

    @Input("loading") set isloading(val: any) {
        if (val) {
            this.ref.clear();
            let loader = this.ref.createComponent(LoaderComponent);
            loader.instance.styles = {
                margin: this.s.margin || "0.5rem",
                width: this.s.width || "50px",
                aspectRatio: this.s.aspectRatio || "1",
                borderColor: this.s.borderColor || "#121212",
                borderTopColor: this.s.borderTopColor || "white"
            };
        } else {
            this.ref.clear();
            this.ref.createEmbeddedView(this.tmpRef);
        }
    }
}

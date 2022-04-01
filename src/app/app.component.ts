import { AfterViewInit, Component, HostListener } from "@angular/core";
import { gsap } from "gsap";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
    constructor() {}

    menu!: HTMLElement;
    menuState: boolean = false;
    animRunning: boolean = false;

    anim!: GSAPTween;

    @HostListener("window:scroll", ["$event"]) navOpacity(e: Event) {
        let scroll =
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;

        document
            .getElementById("nav")!
            .style.setProperty(
                "--tw-bg-opacity",
                Math.max(0, Math.min(1, 0.75 + scroll / 350)).toString()
            );
    }

    toggleMenu() {
        if (this.animRunning) return;

        this.anim = gsap.fromTo(
            "#menu",
            {
                clipPath: `inset(0px 0px 0px ${document.body.clientWidth}px)`
            },
            {
                clipPath: "inset(0px 0px 0px 0px)",
                duration: 0.95,
                ease: "expo.inOut",
                onStart: () => {
                    if (this.menuState && !this.animRunning) {
                        this.animRunning = true;
                        this.menu.classList.toggle("menu_visible");
                    }
                },
                onComplete: () => {
                    this.animRunning = false;
                    if (!this.menuState && !this.animRunning) {
                        this.menu.classList.toggle("menu_visible");
                    }
                },
                runBackwards: this.menuState ? true : false,
                immediateRender: false
            }
        );

        this.menuState = !this.menuState;

        this.anim.play();
    }

    ngAfterViewInit() {
        this.menu = document.getElementById("menu")!;
    }
}

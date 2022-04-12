import { AfterViewInit, Component, HostListener } from "@angular/core";
import { gsap } from "gsap";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
    constructor(public auth: AuthService) {}

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
                Math.max(0, Math.min(1, 0.75 + scroll / 500)).toString()
            );
    }

    toggleMenu(force?: boolean) {
        if (this.animRunning && !force) return;

        this.anim = gsap.fromTo(
            "#menu",
            {
                clipPath: `inset(0px 0px 0px 100vw)`
            },
            {
                clipPath: "inset(0px 0px 0px 0px)",
                duration: 0.95,
                ease: "expo.inOut",
                onStart: () => {
                    this.animRunning = true;
                },
                onComplete: () => {
                    this.animRunning = false;
                },
                runBackwards: this.menuState ? true : false,
                immediateRender: false
            }
        );

        this.menuState = !this.menuState;

        this.anim.play();
    }

    logout() {
        this.auth.logout();
        this.toggleMenu(true);
    }

    ngAfterViewInit() {
        this.menu = document.getElementById("menu")!;
    }
}

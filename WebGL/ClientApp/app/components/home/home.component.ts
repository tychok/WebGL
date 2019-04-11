import { Component, Inject, OnInit, Renderer, HostListener, style } from '@angular/core';

import { Scene } from "../../../3dLib/Scene";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent {

    public static RenderdDivName = "renderdiv";

    constructor() {
    }

    public ngOnInit(): void {

        //needs to be reworked...
        var oldiv = document.getElementById(HomeComponent.RenderdDivName);
        if (oldiv!=null) {
            oldiv.remove();
        }

        var scene = new Scene(this.CallBack, this.Update);
        var renderelement = scene.GetDomElment();
        renderelement.id = HomeComponent.RenderdDivName;
        document.body.appendChild(renderelement);
    }

    //called on render event
    public CallBack(): void {
    }

    //called on update event
    public Update(): void {
    }
}

import * as THREE from 'three';

import "./EnableThree";

import "three/examples/js/controls/OrbitControls";
import "three/examples/js/loaders/OBJLoader";

import { Engine } from "./Engine";
import { WorldObject } from "./WorldObject"

export class Scene {

    public scene: THREE.Scene;
    public camera: THREE.Camera = new THREE.Camera(); 

    private ambientLight: THREE.AmbientLight;

    private rendererDomElement: HTMLCanvasElement;

    public worldObjects: Array<WorldObject> = new Array<WorldObject>();

    constructor(onRender:()=> void, onUpdate:()=> void) {

        this.scene = new THREE.Scene();

        this.ConfigureCamera();

        var engine = new Engine(this, onRender, onUpdate);

        this.rendererDomElement = engine.GetDomElement()

        this.LoadWorldObjects();

        this.ambientLight = new THREE.AmbientLight(0xf0f0f0);
        
        this.scene.add(this.ambientLight);
    }

    public SceneUpdate(): void {
        //add internal update logics
    }

    private ConfigureCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(35, -10, 0);
    }

    private LoadWorldObjects() {
        this.worldObjects.push(new WorldObject('Models/Gramme.obj','Models/Gramme.mtl', this.scene));
    }

    public GetDomElment(): HTMLCanvasElement {
        return this.rendererDomElement;
    }
}
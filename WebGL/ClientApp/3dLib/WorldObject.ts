import * as THREE from 'three';

require('three/examples/js/loaders/MTLLoader.js');

export class WorldObject {

    private objFileLocation: string;
    private mtlFileLocation: string;
    private model: THREE.Object3D = new THREE.Object3D;
    private scene: THREE.Scene;

    public loaded: boolean = false;
    constructor(objFileLocation: string, mtlFileLocation:string, scene: THREE.Scene) {

        this.objFileLocation = objFileLocation;
        this.mtlFileLocation = mtlFileLocation;
        this.scene = scene;

        this.Load();
    }

    private Load() {
        var mtlLoader = new THREE.MTLLoader();

        mtlLoader.load(this.mtlFileLocation, materials=> {

            materials.preload();

            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(this.objFileLocation,
                object => {
                    this.model = object;
                    this.scene.add(object);
                });
        });
    }
}
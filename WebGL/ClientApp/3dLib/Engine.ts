import * as THREE from 'three';

import { Scene } from './Scene';

import "three/examples/js/controls/OrbitControls";
import "three/examples/js/postprocessing/EffectComposer";
import "three/examples/js/postprocessing/RenderPass";
import "three/examples/js/postprocessing/ShaderPass";
import 'three/examples/js/shaders/FXAAShader';
import {  Vector3, ShaderPass } from 'three';

require('three/examples/js/postprocessing/EffectComposer.js');
require('three/examples/js/postprocessing/RenderPass.js');
require('three/examples/js/postprocessing/ShaderPass.js');
require('three/examples/js/shaders/CopyShader.js');

export class Engine {

    private renderer: THREE.WebGLRenderer;
    private currentScene: Scene;

    private postRenderProcess: THREE.EffectComposer;
    private static currentEngine: Engine;

    private onRender: () => any;

    private UpdateEventTimer: number = 1000 / 10; // call every 100ms
    private onUpdate: () => any;

    constructor(scene: Scene, onRender: () => void, onUpdate: () => void) {

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('webgl2') as WebGLRenderingContext;
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context });

        this.ConfigureRenderer();

        var controls = new THREE.OrbitControls(scene.camera, this.renderer.domElement);
        controls.minDistance = 10;
        controls.maxDistance = 500;
        controls.enablePan = false;

        this.onRender = onRender;
        this.onUpdate = onUpdate;
        this.currentScene = scene;

        Engine.currentEngine = this;

        var renderPass = new THREE.RenderPass(scene.scene, scene.camera);

        this.postRenderProcess = new THREE.EffectComposer(this.renderer);

        var shader = new THREE.ShaderMaterial();
        shader.fragmentShader =
        `
        uniform sampler2D tDiffuse;
        varying vec2 vuv;

        float outline_thickness = 5.0;
        vec4 outline_colour = vec4(0, 0, 0, 1);
        float outline_threshold = .9;

        void main()
        {

        vec4 pixel = texture2D(tDiffuse, vuv);

        if (pixel.a <= outline_threshold) 
        {
            ivec2 size = textureSize(tDiffuse,0);

            float uv_x = vuv.x * float(size.x);
            float uv_y = vuv.y * float(size.y);

            float sum = 0.0;
            for (int n = 0; n < 9; ++n) {
                uv_y = (vuv.y * float(size.y)) + (outline_thickness * float(float(n) - 4.5));
                float h_sum = 0.0;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x - (4.0 * outline_thickness), uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x - (3.0 * outline_thickness), uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x - (2.0 * outline_thickness), uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x - outline_thickness, uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x, uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x + outline_thickness, uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x + (2.0 * outline_thickness), uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x + (3.0 * outline_thickness), uv_y), 0).a;
                h_sum += texelFetch(tDiffuse, ivec2(uv_x + (4.0 * outline_thickness), uv_y), 0).a;
                sum += h_sum / 9.0;
                }

                if (sum / 9.0 >= 0.0001) {
                    gl_FragColor = outline_colour;
                }
                else{
                    gl_FragColor = pixel;
                }
            }
        else{
                gl_FragColor = pixel;
        }
    }`;

        shader.vertexShader = 
       `varying vec2 vuv;

        void main()
        {
	        vuv =  vec2( uv.x, uv.y);

	        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`;

        shader.uniforms = {
            tDiffuse: { value: null }
        };

        var shaderPass = new THREE.ShaderPass(shader);
        shaderPass.renderToScreen = true;


        var fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
        fxaaPass.renderToScreen = true;
        var pixelRatio = this.renderer.getPixelRatio();
        fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio);
        fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio);

        this.postRenderProcess.addPass(renderPass);
        this.postRenderProcess.addPass(shaderPass);
        this.postRenderProcess.addPass(fxaaPass);
        this.poll();

        this.Render();
        controls.update();
    }

    private ConfigureRenderer() {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xffffff, 1);
    }

    public GetDomElement(): HTMLCanvasElement {
        return this.renderer.domElement;
    }

    private Render(): void {
        requestAnimationFrame(Engine.currentEngine.Render);

        //unsure what signature should be used
        Engine.currentEngine.onRender();
        Engine.currentEngine.postRenderProcess.render();
    }

    private async poll() {
        while (true) {

            Engine.currentEngine.currentScene.SceneUpdate();

            //unsure what signature should be used
            Engine.currentEngine.onUpdate();

            await this.delay(Engine.currentEngine.UpdateEventTimer);
        }
    }

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
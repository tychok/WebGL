import { Component, Inject, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod} from '@angular/http';
import { Location } from '@angular/common';

import { } from '@angular/core/'

@Component({
    selector: 'app-shadereditor',
    templateUrl: './shadereditor.component.html',
    styleUrls: ['./shadereditor.component.css']
})
/** ShaderEditor component*/
export class ShaderEditorComponent {
    constructor(private http: Http, private location: Location) {
    }

    //private GlContext: WebGLRenderingContext;

    //private fragmentShaderSrc: string;
    //private vertexShaderSrc: string;

    //public errorVertexShader: string|null;
    //public errorFragemtShader: string|null;
    //public errorLinkerError: string | null;

    //public VertexShaderSucces: boolean;
    //public FragmentShaderSucces: boolean;
    //public LinkSucces: boolean;
    //public ShadersSaved: boolean;

    //public ngOnInit(): void {
    //    this.http.get(this.location.prepareExternalUrl('ShaderEditor/GetFragmentShader')).subscribe(result => {
    //        this.fragmentShaderSrc = result.text();

    //        this.http.get(this.location.prepareExternalUrl('ShaderEditor/GetVertexShader')).subscribe(result => {
    //            this.vertexShaderSrc = result.text();

    //            this.ShowShaders();
    //        }, error => console.error(error));
    //    }, error => console.error(error));
    //}

    //public ShowShaders():void
    //{
    //    this.GlContext = new Canvas(0, 0).getGlContext();

    //    var shader = new Shader(this.vertexShaderSrc, this.fragmentShaderSrc, this.GlContext);

    //    this.errorVertexShader = shader.CompileShader(this.vertexShaderSrc, this.GlContext.VERTEX_SHADER);

    //    this.errorFragemtShader = shader.CompileShader(this.fragmentShaderSrc, this.GlContext.FRAGMENT_SHADER);

    //    if (this.errorFragemtShader == null && this.errorVertexShader == null)
    //        this.errorLinkerError = shader.LinkShaders();

    //    (<HTMLInputElement>document.getElementById('vertexshader')).value = this.vertexShaderSrc;
    //    (<HTMLInputElement>document.getElementById('fragmentshader')).value = this.fragmentShaderSrc;
    //}

    //public compileVertex(): void {
    //    var shader = new Shader("", "", this.GlContext);
    //    this.errorVertexShader = shader.CompileShader((<HTMLInputElement>document.getElementById('vertexshader')).value, this.GlContext.VERTEX_SHADER);

    //    this.VertexShaderSucces = true;
        
    //}

    //public compileFragment(): void {
    //    var shader = new Shader("", "", this.GlContext);
    //    this.errorFragemtShader = shader.CompileShader((<HTMLInputElement>document.getElementById('fragmentshader')).value, this.GlContext.FRAGMENT_SHADER);
    //    this.FragmentShaderSucces = true;
    //}

    //public linkShaders(): void {
    //    var shader = new Shader("", "", this.GlContext);
    //    this.errorVertexShader = shader.CompileShader((<HTMLInputElement>document.getElementById('vertexshader')).value, this.GlContext.VERTEX_SHADER);
    //    this.errorFragemtShader = shader.CompileShader((<HTMLInputElement>document.getElementById('fragmentshader')).value, this.GlContext.FRAGMENT_SHADER);
    //    this.errorLinkerError = shader.LinkShaders();

    //    this.LinkSucces = true;
    //}

    //public saveShaders(): void {
    //    var shader = new Shader("", "", this.GlContext);

    //    var vertexshader = (<HTMLInputElement>document.getElementById('vertexshader')).value;
    //    var fragmentshader = (<HTMLInputElement>document.getElementById('fragmentshader')).value;

    //    this.errorVertexShader = shader.CompileShader(vertexshader, this.GlContext.VERTEX_SHADER);

    //    this.errorFragemtShader = shader.CompileShader(fragmentshader, this.GlContext.FRAGMENT_SHADER);

    //    if (this.errorFragemtShader == null && this.errorVertexShader == null)
    //        this.errorLinkerError = shader.LinkShaders();
    //    if (this.errorFragemtShader == null && this.errorLinkerError == null && this.errorVertexShader == null) {

    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    this.http.post(this.location.prepareExternalUrl('ShaderEditor/SaveShaders'),
    //        JSON.stringify( { vertexshader, fragmentshader }), options).subscribe(
    //            data => {
    //                console.log("Shaders are saved");
    //                this.ShadersSaved = true;
    //            },
    //            error => {
    //                console.log(JSON.stringify(error.json()));
                    
    //            }
    //        );

    //    }
    //}


}
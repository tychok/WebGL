using System;

namespace WebGLService
{
    public class ShaderState
    {
        private static ShaderState Instance;

        public string VertexShader { get; set; }
        public string FragmentShader { get; set; }

        private ShaderState(){

            //i know this is dirty

            FragmentShader += "precision mediump float;" + Environment.NewLine;
            FragmentShader += "varying vec4 v_color;" + Environment.NewLine;
            FragmentShader += Environment.NewLine;
            FragmentShader += "void main(void)" + Environment.NewLine;
            FragmentShader += "{" + Environment.NewLine;
            FragmentShader += "gl_FragColor = v_color;" + Environment.NewLine;
            FragmentShader += "}" + Environment.NewLine;


            VertexShader += "attribute vec3 a_position;" + Environment.NewLine;
            VertexShader += "uniform vec4 u_color;" + Environment.NewLine;
            VertexShader += "uniform vec4 u_offset;" + Environment.NewLine;
            VertexShader += "uniform mat4 u_projection;" + Environment.NewLine;
            VertexShader += "uniform mat4 u_view;" + Environment.NewLine;
            VertexShader += "varying vec4 v_color;" + Environment.NewLine;
            VertexShader += Environment.NewLine;
            VertexShader += "void main() {" + Environment.NewLine;
            VertexShader += "gl_Position = vec4(a_position[0],a_position[1], a_position[2], 1) + u_offset;" + Environment.NewLine;
            VertexShader += "v_color = u_color;" + Environment.NewLine;
            VertexShader += "}" + Environment.NewLine;

        }

        public static  ShaderState Singleton()
        {
            if (Instance == null)
                Instance = new ShaderState();
            return Instance;
        }
    }
}

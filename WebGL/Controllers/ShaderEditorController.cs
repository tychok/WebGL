using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebGLService;

namespace WebGL.Controllers
{
    public class ShaderEditorController : Controller
    {
        public IActionResult Shader()
        {
            return View();
        }

        public string GetFragmentShader()
        {
            return ShaderState.Singleton().FragmentShader;
        }

        public string GetVertexShader()
        {
            return ShaderState.Singleton().VertexShader;
        }

        [HttpPost]
        public void SaveShaders([FromBody] JObject shaders)
        {
            ShaderState.Singleton().VertexShader = shaders["vertexshader"].ToString(); 
            ShaderState.Singleton().FragmentShader = shaders["fragmentshader"].ToString();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebGLService;

namespace WebGL.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
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
    }
}

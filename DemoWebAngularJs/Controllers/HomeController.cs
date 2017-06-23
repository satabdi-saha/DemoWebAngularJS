using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DemoWebAngularJs.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string path, int? id)
        {
            return View();
        }
    }
}
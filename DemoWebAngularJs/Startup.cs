using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DemoWebAngularJs.Startup))]
namespace DemoWebAngularJs
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
        }
    }
}

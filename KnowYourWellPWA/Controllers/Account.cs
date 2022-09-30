using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Semantics;
using System.Diagnostics.Eventing.Reader;

namespace KnowYourWellPWA.Controllers
{
    public class Account : Controller
    {

        public async Task Login (string returnurl = "/")
        {
            await HttpContext.ChallengeAsync("Auth0", new AuthenticationProperties() { RedirectUri = returnurl });
        }

        public async Task logout()
        {
            await HttpContext.SignOutAsync("Auth0", new AuthenticationProperties()
            {
                RedirectUri = Url.Action("index", "Home")
            });
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }


        public IActionResult Index()
        {
            return View();
        }
    }
}

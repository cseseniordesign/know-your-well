using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddProgressiveWebApp();

var app = builder.Build();
 

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


// Add the memory cache services.
builder.Services.AddMemoryCache();

//builder.Services.AddAuthentication(Options =>
//{
//    Options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//    Options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//    Options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//}).AddCookie().AddOpenIdConnect("Auth0", Options =>
//{
//    //set authority to the auth0 domain
//    Options.Authority = $"https://{builder.Configuration["Auth0:Domain"]}";
//    //configure Auth0
//    Options.ClientId = builder.Configuration["Auth0:ClientId"];
//    Options.ClientSecret = builder.Configuration["Auth0:ClientSecret"];

//    //set response type to code
//    Options.ResponseType = OpenIdConnectResponseType.Code;

//    //set scope
//    Options.Scope.Clear();
//    Options.Scope.Add("openid");

//    //set callback path 
//    Options.CallbackPath = new PathString("/callback");

//    //set issuer
//    Options.ClaimsIssuer = "Auth0";
//    /*
//    Options.Events = new OpenIdConnectEvents
//    {
//        //handle the logout redirection
//        OnRedirectToIdentityProviderForSignOut = (context) =>
//        {
//            var logoutUri = $"https://{builder.Configuration["Auth0:Domain"]}/v2/logout?client_id={builder.Configuration["Auth0:Domain"]}";
//            var postlogouturi = context.Properties.RedirectUri;
//            if (!string.IsNullOrEmpty(postlogouturi))
//            {
//                if (postlogouturi.StartsWith("/"))
//                {
//                    //transform to absolute 
//                    var request = context.Request;
//                    postlogouturi = request.Scheme + "://" + request.Host + request.PathBase + postlogouturi;

//                    logoutUri += $"&returnTo={Uri.UnescapeDataString(postlogouturi)}";
//                }
//            }
//            context.Response.Redirect(logoutUri);
//            context.HandleResponse();
//            return Task.CompletedTask;
//        }

//    };
//    */

//    //   context.Response.Redirect($"https://{auth0Settings.Value.Domain}/v2/logout?client_id={auth0Settings.Value.ClientId}&returnTo={context.Request.Scheme}://{context.Request.Host}/");
//    //   context.HandleResponse();


//});

    
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();





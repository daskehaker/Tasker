using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq.Expressions;
using System.Net.Mime;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Tasker2.Controllers.Resource;
using Tasker2.Entities;
using Tasker2.Models;

namespace Tasker2.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly ApplicationSettings _settings;

        public ApplicationUsersController (UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IMapper mapper,
            IOptionsSnapshot<ApplicationSettings> options) {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _settings = options.Value;
        }

        [HttpPost]
        [Route ("Register")]
        //api/applicationusers/register
        public async Task<IActionResult> PostApplicationUser (ApplicationUserResource userResource) {
             var user = _mapper.Map<ApplicationUserResource, ApplicationUser> (userResource);
             
            try {
                 var result = await _userManager.CreateAsync(user, userResource.Password);
                 
                 if (result.Succeeded)
                 {
                     var currentUser = await _userManager.FindByNameAsync(user.UserName);
                     var roleResult = await _userManager.AddToRoleAsync(currentUser, Roles.User);
                     return Ok();
                 }
                 else
                 {
                    return BadRequest(new { message = result.Errors });
                 }
            } 
             
            catch (Exception ex) 
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route ("Login")]
        //api/applicationusers/Login
        public async Task<IActionResult> LoginApplicationUser (LoginResource userLogin) {
            var user = await _userManager.FindByNameAsync (userLogin.UserName);

            /*if (userRole.Count == 0)
            {
                await _userManager.AddToRoleAsync(user, Roles.User);
                userRole = await _userManager.GetRolesAsync(user);
            }*/
            if (user == null) return BadRequest (new { message = "This user Name Does not exists" });
            var exists = await _userManager.CheckPasswordAsync (user, userLogin.Password);
            if (!exists) return BadRequest (new { message = "Password is incorrect" });
            var userRole = await _userManager.GetRolesAsync(user);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new Claim[] {
                new Claim ("UserID", user.Id.ToString()),
                new Claim (ClaimTypes.Role, userRole[0])
                }),
                Expires = DateTime.UtcNow.AddMonths(6),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (Encoding.UTF8.GetBytes (_settings.JWTSecret)), SecurityAlgorithms.HmacSha256Signature)
            };
            var TokenHandler = new JwtSecurityTokenHandler ();
            var securityToken = TokenHandler.CreateToken (tokenDescriptor);
            var token = TokenHandler.WriteToken (securityToken);
            return Ok (new { token });
        }
    }
}
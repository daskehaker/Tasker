using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Tasker2.Models;
using Tasker2.Controllers.Resource;
using AutoMapper;
using Tasker2.Entities;
using System.Collections.Generic;

namespace Tasker2.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfilesController: ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public UserProfilesController(UserManager<ApplicationUser> userManager,
        IMapper mapper) {
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            // only allow admins to access other user records
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            if (id != userId && !User.IsInRole(Roles.Admin))
                return Forbid();

            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
                return NotFound();

            var result = _mapper.Map<ApplicationUser, ApplicationUserInfoResource>(user);
            var roles = await _userManager.GetRolesAsync(user);
            result.Role = roles[0];

            return Ok(result);
        }

        [HttpGet]
        public async Task<ApplicationUserInfoResource> GetUsetProfile() {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var result = _mapper.Map<ApplicationUser, ApplicationUserInfoResource>(user);

            var roles = await _userManager.GetRolesAsync(user);
            result.Role = roles[0];
            return result;
        }

        [Authorize(Roles = Roles.Admin)]
        [HttpGet]
        [Route("all")]
        public IActionResult GetAll()
        {
            var users = _userManager.Users.ToList();
            //_mapper.Map<List<ApplicationUser>, List<ApplicationUserInfoResource>>(users);
            return Ok(_mapper.Map<List<ApplicationUser>, List<ApplicationUserInfoResource>>(users));
            //return Ok(users);
        }
    }
}
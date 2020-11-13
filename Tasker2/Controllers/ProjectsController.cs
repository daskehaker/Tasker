using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Tasker2.Models;
using Tasker2.Controllers.Resource;
using Tasker2.Data;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Tasker2.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly TaskerContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public ProjectsController(TaskerContext context, 
        UserManager<ApplicationUser> userManager,
        IMapper mapper)
        {
            _context=context;
            _mapper=mapper;
            _userManager=userManager;
        }

        // GET api/projects
        [HttpPost]
        public async Task<ActionResult> PostProject([FromBody] ProjectResource projectRes)
        {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            Project duplicate = await _context.Projects.SingleOrDefaultAsync(e => e.Title == projectRes.Title 
                && e.Date == projectRes.Date);
            if (duplicate != null)
            {
                return Conflict();
            }

            var project = _mapper.Map<ProjectResource, Project>(projectRes);
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            project.UserId = userId;
            _context.Add(project);
            await _context.SaveChangesAsync();

            var result = _mapper.Map<Project, ProjectResource>(project);

            return CreatedAtAction("GetProject", new { id = result.ProjectId }, result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectResource>>> GetProjects () {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var projects = await _context.Projects.Where(p => p.UserId.Equals(userId)).OrderBy(p => p.Date).ToListAsync();
            return _mapper.Map<List<Project>, List<ProjectResource>> (projects);
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResource>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            if (project.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            var projectResource = _mapper.Map<Project, ProjectResource>(project);

            return Ok(projectResource);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject (int id){
            if(!ProjectExist(id)){
                return NotFound();
            }

            var project = await _context.Projects.FindAsync(id);

            if (project.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return project;
        }

        [HttpPut ("{id}")]
        public async Task<IActionResult> PutProject (int id, [FromBody] ProjectResource projectResource) {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            var project = await _context.Projects.FindAsync (id);

            if (project == null) {
                return NotFound ();
            }

            if (project.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            _mapper.Map<ProjectResource, Project> (projectResource, project);

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                if (!ProjectExist (id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            project = await _context.Projects.FindAsync (project.ProjectId);

            var result = _mapper.Map<Project, ProjectResource> (project);

            return Ok (result);
        }

        private bool ProjectExist (int id) {
            return _context.Projects.Any(p => p.ProjectId == id);
        }
    }
}
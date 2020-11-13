using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tasker2.Controllers.Resource;
using Tasker2.Data;
using Tasker2.Models;

namespace Tasker2.Controllers {

    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase {
        private readonly TaskerContext _context;
        private readonly IMapper mapper;

        public ExercisesController (TaskerContext context, IMapper mapper) {
            _context = context;
            this.mapper = mapper;
        }

        // GET: api/Exercises
        [HttpGet]
        public async Task<IEnumerable<ExerciseResource>> GetExercise () {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var exercises = await _context.Exercises.Where(e => e.UserId.Equals(userId)).ToListAsync();
            return mapper.Map<List<Exercise>, List<ExerciseResource>> (exercises);
        }

        // GET: api/Exercises/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<ExerciseResource>> GetExercise (int id) {
            var exercise = await _context.Exercises.FindAsync (id);

            if (exercise == null) {
                return NotFound ();
            }

            if (exercise.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            var exerciseResource = mapper.Map<Exercise, ExerciseResource> (exercise);

            return Ok (exerciseResource);
        }

        // PUT: api/Exercises/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut ("{id}")]
        public async Task<IActionResult> PutExercise (int id, [FromBody] ExerciseResource exerciseResource) {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            var exercise = await _context.Exercises.FindAsync (id);

            if (exercise == null) {
                return NotFound ();
            }

            if (exercise.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            mapper.Map<ExerciseResource, Exercise> (exerciseResource, exercise);

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                if (!ExerciseExists (id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            exercise = await _context.Exercises.FindAsync (exercise.ExerciseId);

            var result = mapper.Map<Exercise, ExerciseResource> (exercise);

            return Ok (result);
        }

        // POST: api/Exercises
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Exercise>> PostExercise ([FromBody] ExerciseResource exerciseResource) {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            //Check for duplicate 
            Exercise duplicate = await _context.Exercises.SingleOrDefaultAsync(e => e.Name == exerciseResource.Name);
            if (duplicate != null)
            {
                //return Conflict(duplicate);
                return Conflict();
            }

            var exercise = mapper.Map<ExerciseResource, Exercise> (exerciseResource);
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            exercise.UserId = userId;
            _context.Exercises.Add (exercise);
            await _context.SaveChangesAsync ();

            return CreatedAtAction ("GetExercise", new { id = exercise.ExerciseId }, exercise);
        }

        // DELETE: api/Exercises/5
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Exercise>> DeleteExercise (int id) {
            var exercise = await _context.Exercises.FindAsync (id);
            if (exercise == null) {
                return NotFound ();
            }
            if (exercise.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            _context.Exercises.Remove (exercise);
            await _context.SaveChangesAsync ();

            return exercise;
        }

        private bool ExerciseExists (int id) {
            return _context.Exercises.Any (e => e.ExerciseId == id);
        }
    }
}
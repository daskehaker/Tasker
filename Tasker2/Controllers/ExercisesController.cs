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

        private readonly IMapper mapper;
        private readonly IExercisesRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ExercisesController (IMapper mapper, IExercisesRepository repository, IUnitOfWork unitOfWork) {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Exercises
        [HttpGet]
        public async Task<IEnumerable<ExerciseResource>> GetExercise () {
            string userId = GetUserId();
            var exercises = await repository.GetListByUserId(userId);
            return mapper.Map<List<Exercise>, List<ExerciseResource>> (exercises);
        }

        // GET: api/Exercises/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<ExerciseResource>> GetExercise (int id) {
            var exercise = await repository.Get(id);

            if (exercise == null) {
                return NotFound ();
            }

            if (exercise.UserId != GetUserId())
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

            var exercise = await repository.Get(id);

            if (exercise == null) {
                return NotFound ();
            }

            if (exercise.UserId != GetUserId())
            {
                return Forbid();
            }

            mapper.Map<ExerciseResource, Exercise> (exerciseResource, exercise);

            try {
                await unitOfWork.CompleteAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!repository.IfExists(id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            exercise = await repository.Get(exercise.ExerciseId);

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
            /*Exercise duplicate = await _context.Exercises.SingleOrDefaultAsync(e => e.Name == exerciseResource.Name);
            if (duplicate != null)
            {
                //return Conflict(duplicate);
                return Conflict();
            }*/

            var exercise = mapper.Map<ExerciseResource, Exercise> (exerciseResource);
            string userId = GetUserId();
            exercise.UserId = userId;
            repository.Add(exercise);
            await unitOfWork.CompleteAsync();

            return CreatedAtAction ("GetExercise", new { id = exercise.ExerciseId }, exercise);
        }

        // DELETE: api/Exercises/5
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Exercise>> DeleteExercise (int id) {
            var exercise = await repository.Get(id);
            if (exercise == null) {
                return NotFound ();
            }
            if (exercise.UserId != GetUserId())
            {
                return Forbid();
            }

            repository.Remove (exercise);
            await unitOfWork.CompleteAsync();

            return exercise;
        }

        public string GetUserId()
        {
            return User.Claims.First(c => c.Type == "UserID").Value;
        }
    }
}
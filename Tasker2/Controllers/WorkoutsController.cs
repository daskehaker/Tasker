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
    public class WorkoutsController : ControllerBase {
        private readonly TaskerContext _context;
        private readonly IMapper mapper;

        public WorkoutsController (TaskerContext context, IMapper mapper) {
            _context = context;
            this.mapper = mapper;
        }

        // GET: api/Workouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutResource>>> GetWorkouts () {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var workouts = await _context.Workouts.Where(w => w.UserId == userId)
                .Include (e => e.Exercises).OrderBy(w => w.Date).ToListAsync();
            return mapper.Map<List<Workout>, List<WorkoutResource>> (workouts);
        }

        // GET: api/Workouts/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<WorkoutResource>> GetWorkout (int id) {
            var workout = await _context.Workouts.Include (w => w.Exercises).SingleOrDefaultAsync (w => w.WorkoutId == id);

            if (workout == null) {
                return NotFound ();
            }

            if (workout.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            return mapper.Map<Workout, WorkoutResource> (workout);
        }

        [HttpGet("{id}/Exercises")]
        public async Task<ActionResult<IEnumerable<WorkoutExerciseResource>>> GetWorkoutExercises(int id)
        {
            var workout = await _context.Workouts.Include(w => w.Exercises).SingleOrDefaultAsync(w => w.WorkoutId == id);

            if (workout == null)
            {
                return NotFound();
            }

            if (workout.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            var exercises = workout.Exercises.ToList();
            return mapper.Map<List<WorkoutExercise>, List<WorkoutExerciseResource>>(exercises);
        }

    // PUT: api/Workouts/5
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPut ("{id}")]
        public async Task<IActionResult> PutWorkout (int id, [FromBody] SaveWorkoutResource saveWorkout) {
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            var workout = await _context.Workouts
                .Include (w => w.Exercises)
                .SingleOrDefaultAsync (w => w.WorkoutId == id);

            if (workout == null)
            {
                return NotFound();
            }

            if (workout.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            mapper.Map<SaveWorkoutResource, Workout> (saveWorkout, workout);

            workout = MapUrl(workout);

            try {
                await _context.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                if (!WorkoutExists (id)) {
                    return NotFound ();
                } else {
                    throw;
                }
            }

            var result = mapper.Map<Workout, WorkoutResource> (workout);

            return Ok (result);
        }

        // POST: api/Workouts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout ([FromBody] SaveWorkoutResource saveWorkout) {
            //throw new Exception ();
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            Workout duplicate = await _context.Workouts.SingleOrDefaultAsync(w => w.Title == saveWorkout.Title &&
                w.Date == saveWorkout.Date);
            if (duplicate != null)
            {
                //return Conflict(duplicate);
                return Conflict();
            }

            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var workout = mapper.Map<SaveWorkoutResource, Workout> (saveWorkout);
            
            workout = MapUrl(workout);
            workout.UserId = userId;

            _context.Workouts.Add(workout);

            await _context.SaveChangesAsync();

            var result = mapper.Map<Workout, WorkoutResource> (workout);

            return CreatedAtAction("GetWorkout", new { id = result.WorkoutId }, result);
        }

        // DELETE: api/Workouts/5
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Workout>> DeleteWorkout (int id) {
            if (!WorkoutExists (id)) {
                return NotFound ();
            }

            var workout = await _context.Workouts.FindAsync (id);

            if (workout.UserId != User.Claims.First(c => c.Type == "UserID").Value)
            {
                return Forbid();
            }

            _context.Workouts.Remove (workout);
            await _context.SaveChangesAsync ();

            return workout;
        }

        private bool WorkoutExists (int id) {
            return _context.Workouts.Any (e => e.WorkoutId == id);
        }

        private Workout MapUrl(Workout workout) {
            foreach(var e in workout.Exercises.ToList()){
                if(_context.Exercises.Find(e.ExerciseId).VideoUrl != null){
                e.VideoUrl = _context.Exercises.Find(e.ExerciseId).VideoUrl.ToString();
                }
            }
            return workout;
        }
    }
}
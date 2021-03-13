using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Controllers.Resource;
using Tasker2.Data;
using Tasker2.Models;

namespace Tasker2.Controllers
{

    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class WorkoutsController : ControllerBase {
        private readonly IMapper mapper;
        private readonly IWorkoutRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public WorkoutsController (IMapper mapper, IWorkoutRepository repository, IUnitOfWork unitOfWork) {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        // GET: api/Workouts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutResource>>> GetWorkouts () {
            var userId = GetUserId();

            var workouts = await repository.GetListByUserId(userId);

            return mapper.Map<List<Workout>, List<WorkoutResource>> (workouts);
        }

        // GET: api/Workouts/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<WorkoutResource>> GetWorkout (int id) {

            var workout = await repository.Get(id);
            if (workout == null) {
                return NotFound ();
            }

            if (workout.UserId != GetUserId())
            {
                return Forbid();
            }

            return mapper.Map<Workout, WorkoutResource> (workout);
        }

        [HttpGet("{id}/Exercises")]
        public async Task<ActionResult<IEnumerable<WorkoutExerciseResource>>> GetWorkoutExercises(int id)
        {
            var workout = await repository.Get(id);

            if (workout == null)
            {
                return NotFound();
            }

            if (workout.UserId != GetUserId())
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

            var workout = await repository.Get(id);

            if (workout == null)
            {
                return NotFound();
            }

            if (workout.UserId != GetUserId())
            {
                return Forbid();
            }

            mapper.Map<SaveWorkoutResource, Workout> (saveWorkout, workout);

           // workout = MapUrl(workout);

            try {
                await unitOfWork.CompleteAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!repository.IfExists(id)) {
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
        public async Task<IActionResult> PostWorkout ([FromBody] SaveWorkoutResource saveWorkout) {
            //throw new Exception ();
            if (!ModelState.IsValid) {
                return BadRequest (ModelState);
            }

            /*Workout duplicate = await _context.Workouts.SingleOrDefaultAsync(w => w.Title == saveWorkout.Title &&
                w.Date == saveWorkout.Date);
            if (duplicate != null)
            {
                return Conflict();
            }*/

            string userId = GetUserId();

            var workout = mapper.Map<SaveWorkoutResource, Workout> (saveWorkout);
            
           // workout = MapUrl(workout);
            workout.UserId = userId;

            repository.Add(workout);

            await unitOfWork.CompleteAsync();

            var result = mapper.Map<Workout, WorkoutResource> (workout);

            return CreatedAtAction("GetWorkout", new { id = result.WorkoutId }, result);
        }

        //SITAS BUDAS GRAZESNIS
        // DELETE: api/Workouts/5
        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeleteWorkout (int id) {
            if (!repository.IfExists(id)) {
                return NotFound ();
            }

            var workout = await repository.Get(id, includeRelated: false);

            if (workout.UserId != GetUserId())
            {
                return Forbid();
            }

            repository.Remove(workout);
            await unitOfWork.CompleteAsync();

            return Ok(workout);
        }

        public string GetUserId()
        {
            return User.Claims.First(c => c.Type == "UserID").Value;
        }

       /* private Workout MapUrl(Workout workout) {
            foreach(var e in workout.Exercises.ToList()){
                if(_context.Exercises.Find(e.ExerciseId).VideoUrl != null){
                e.VideoUrl = _context.Exercises.Find(e.ExerciseId).VideoUrl.ToString();
                }
            }
            return workout;
        }*/
    }
}
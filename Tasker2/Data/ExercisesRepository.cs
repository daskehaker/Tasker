using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.Data
{
    public class ExercisesRepository : IExercisesRepository
    {
        private readonly TaskerContext _context;

        public ExercisesRepository(TaskerContext context)
        {
            this._context = context;
        }

        public void Add(Exercise exercise)
        {
            _context.Exercises.Add(exercise);
        }

        public async Task<Exercise> Get(int id)
        {
            return await _context.Exercises.FindAsync(id);
        }

        public async Task<List<Exercise>> GetListByUserId(string id)
        {
            return await _context.Exercises.Where(e => e.UserId.Equals(id)).ToListAsync();
        }

        public bool IfExists(int id)
        {
            return _context.Exercises.Any(e => e.ExerciseId == id);
        }

        public void Remove(Exercise exercise)
        {
            _context.Exercises.Add(exercise);
        }
    }
}

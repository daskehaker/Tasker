using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.Data
{
    public class WorkoutsRepository : IWorkoutRepository
    {
        private readonly TaskerContext _context;

        public WorkoutsRepository(TaskerContext context)
        {
            this._context = context;
        }

        public async Task<Workout> Get(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await _context.Workouts.FindAsync(id);
            }

            return await _context.Workouts
                .Include(w => w.Exercises)
                .SingleOrDefaultAsync(w => w.WorkoutId == id);
        }

        public async Task<List<Workout>> GetListByUserId(string id)
        {
            return await _context.Workouts.Where(w => w.UserId == id)
                .Include(e => e.Exercises).OrderBy(w => w.Date).ToListAsync();
        }

        public void Add(Workout workout)
        {
            _context.Workouts.Add(workout);
        }

        public void Remove(Workout workout)
        {
            _context.Workouts.Remove(workout);
        }

        public bool IfExists(int id)
        {
            return _context.Workouts.Any(e => e.WorkoutId == id);
        }
    }
}

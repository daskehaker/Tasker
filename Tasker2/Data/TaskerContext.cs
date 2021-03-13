using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.Data
{
    public class TaskerContext: IdentityDbContext
    {

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers{ get; set;}

        public TaskerContext(DbContextOptions<TaskerContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<WorkoutExercise>().HasKey(we => new { we.WorkoutId, we.ExerciseId });
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Tasker2.Models
{
    [Table("WorkoutExercises")]
    public class WorkoutExercise
    {
        public int WorkoutId { get; set; }
        public int ExerciseId { get; set; }
        public string Name { get; set; }
        [Range(0, 1000000)]
        public int Sets { get; set; }
        [Range(0, 1000000)]
        public int Reps { get; set; }
        public int Index { get; set; }
        public string VideoUrl {get; set; }

        public Workout Workout { get; set; }
        public Exercise Exercise { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.ViewModels;

namespace Tasker2.Models
{
    [Table("Workouts")]
    public class Workout
    { 
        public int WorkoutId { get; set; }
        [Required]
        [StringLength(255)]
        public string Title { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        public ICollection<WorkoutExercise> Exercises { get; set; }
        
        public Workout()
        {
            Exercises = new Collection<WorkoutExercise>();
        }
    }
}

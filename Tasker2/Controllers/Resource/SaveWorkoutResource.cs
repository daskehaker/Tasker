using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.Controllers.Resource {
    public class SaveWorkoutResource {
        public int WorkoutId { get; set; }

        [Required]
        [Column (TypeName = "varchar(50)")]
        public string Title { get; set; }

        [Required]
        public WorkoutType Type { get; set; }

        [Required]
        public DateTime Date { get; set; }
        public ICollection<SaveWorkoutExerciseResource> Exercises { get; set; }

        public SaveWorkoutResource () {
            Exercises = new Collection<SaveWorkoutExerciseResource> ();
        }
    }
}
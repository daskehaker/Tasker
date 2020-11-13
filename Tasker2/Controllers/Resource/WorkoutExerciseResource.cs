using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tasker2.Controllers.Resource {
    public class WorkoutExerciseResource {
        public int ExerciseId { get; set; }
        public string Name { get; set; }

        [Required]
        [Range (0, 1000000)]
        public int Sets { get; set; }

        [Required]
        [Range (0, 1000000)]
        public int Reps { get; set; }
        public int Index { get; set; }
        public string VideoUrl {get; set; }
    }
}
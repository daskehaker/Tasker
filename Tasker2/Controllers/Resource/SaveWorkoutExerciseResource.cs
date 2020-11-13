using System.ComponentModel.DataAnnotations;

namespace Tasker2.Controllers.Resource
{
    public class SaveWorkoutExerciseResource
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; }

        [Required]
        [Range (0, 1000000)]
        public int Sets { get; set; }

        [Required]
        [Range (0, 1000000)]
        public int Reps { get; set; }
        public int Index { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.Controllers.Resource {
    public class ExerciseResource {
        public int ExerciseId { get; set; }

        [Required]
        [Column (TypeName = "varchar(50)")]
        public string Name { get; set; }

        [Column (TypeName = "varchar(500)")]
        public string VideoUrl { get; set; }

        [Required]
        public MusculeGroup MusculeGroup { get; set; }
    }
}
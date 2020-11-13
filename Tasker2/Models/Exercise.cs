using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Tasker2.Models
{
    [Table("Exercises")]
    public class Exercise
    {
        public int ExerciseId { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }

        [Column(TypeName = "varchar(500)")]
        public string VideoUrl { get; set; }
        public MusculeGroup MusculeGroup { get; set; }
        public string UserId { get; set; }
    }
}

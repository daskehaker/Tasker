using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.ViewModels
{
    public class AddWorkoutViewModel
    {
        public MusculeGroup Muscule { get; set; }
        public List<AddedExercise> Exercises { get; set; }
        public List<SelectListItem> MusculeGroups { get; set; }
        public DateTime WorkoutDate { get; set; }

        public AddWorkoutViewModel()
        {
            MusculeGroups = new List<SelectListItem>();

            foreach (MusculeGroup group in Enum.GetValues(typeof(MusculeGroup))){
                MusculeGroups.Add(new SelectListItem{
                    Value = ((int)group).ToString(),
                    Text = group.ToString()
                });
            }
        }
    }
}

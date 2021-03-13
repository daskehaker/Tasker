using System.Runtime.InteropServices;
using System.Threading;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Tasker2.Controllers.Resource;
using Tasker2.Models;

namespace Tasker2.Mapping
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            //Api to domain
            CreateMap<Exercise, ExerciseResource>();
            CreateMap<Workout, WorkoutResource>();
            CreateMap<Workout, WorkoutResource>()
                .ForMember(wr => wr.Exercises, opt => opt.MapFrom(w => w.Exercises.Select(e => new WorkoutExerciseResource { ExerciseId = e.ExerciseId, Name = e.Name, Reps = e.Reps, Sets = e.Sets, Index = e.Index, VideoUrl = e.VideoUrl })));

            CreateMap<ApplicationUser, ApplicationUserResource>()
                .ForMember(ar => ar.Password, opt => opt.Ignore())
                .ForMember(ar => ar.FullName, opt => opt.MapFrom(au => au.FullName))
                .ForMember(ar => ar.Email, opt => opt.MapFrom(au => au.Email))
                .ForMember(ar => ar.UserName, opt => opt.MapFrom(au => au.UserName));

            CreateMap<ApplicationUser, ApplicationUserInfoResource>();

            CreateMap<WorkoutExercise, WorkoutExerciseResource>();

            //Domain to api
            CreateMap<ExerciseResource, Exercise>().ForMember(e => e.ExerciseId, opt => opt.Ignore());

            CreateMap<ApplicationUserResource, ApplicationUser>()
                .ForMember(au => au.FullName, opt => opt.MapFrom(ar => ar.FullName))
                .ForMember(au => au.Email, opt => opt.MapFrom(ar => ar.Email))
                .ForMember(au => au.UserName, opt => opt.MapFrom(ar => ar.UserName));

            CreateMap<SaveWorkoutResource, Workout>()
                .ForMember(w => w.WorkoutId, opt => opt.Ignore())
                //.ForMember(w => w.Exercises, opt => opt.MapFrom(we => we.Exercises.Select(e => new WorkoutExercise { ExerciseId = e.ExerciseId, Sets = e.Sets, Reps=e.Reps })));
                .ForMember(w => w.Exercises, opt => opt.Ignore())
                .AfterMap((wr, w) =>
                {
                    //remove unselected exercises
                    var removedExercises = w.Exercises.Where(e =>
                        !wr.Exercises.Contains(new SaveWorkoutExerciseResource { ExerciseId = e.ExerciseId, Name = e.Name, Reps = e.Reps, Sets = e.Sets, Index = e.Index})
                    );
                    foreach (var e in removedExercises.ToList())
                        w.Exercises.Remove(e);

                    var addedExercises = wr.Exercises.Where(wre => !w.Exercises.Any(e => e.ExerciseId == wre.ExerciseId)).Select(e => new WorkoutExercise { ExerciseId = e.ExerciseId, Name = e.Name, Sets = e.Sets, Reps = e.Reps, Index = e.Index });
                    foreach (var e in addedExercises)
                        w.Exercises.Add(e);
                });
        }
    }
}

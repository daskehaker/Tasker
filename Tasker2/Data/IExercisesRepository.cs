using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.Data
{
    public interface IExercisesRepository
    {
        Task<Exercise> Get(int id);
        Task<List<Exercise>> GetListByUserId(string id);
        void Add(Exercise exercise);
        void Remove(Exercise exercise);
        bool IfExists(int id);
    }
}

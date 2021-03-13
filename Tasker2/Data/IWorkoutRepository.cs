using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasker2.Models;

namespace Tasker2.Data
{
    public interface IWorkoutRepository
    {
        Task<Workout> Get(int id, bool includeRelated = true);
        Task<List<Workout>> GetListByUserId(string id);
        void Add(Workout workout);
        void Remove(Workout workout);
        bool IfExists(int id);
    }
}

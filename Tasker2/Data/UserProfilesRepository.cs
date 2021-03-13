using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tasker2.Data
{
    public class UserProfilesRepository
    {
        private readonly TaskerContext context;

        public UserProfilesRepository(TaskerContext _context)
        {
            context = _context;
        }

    }
}

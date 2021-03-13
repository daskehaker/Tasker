using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tasker2.Data
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}

using System.Threading.Tasks;

namespace Tasker2.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TaskerContext context;

        public UnitOfWork(TaskerContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
           await context.SaveChangesAsync();
        }
    }
}

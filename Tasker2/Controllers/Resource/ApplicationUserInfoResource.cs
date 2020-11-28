using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tasker2.Controllers.Resource
{
    public class ApplicationUserInfoResource
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
    }
}

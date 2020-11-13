using System.ComponentModel.DataAnnotations;

namespace Tasker2.Controllers.Resource {
    public class LoginResource {

        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
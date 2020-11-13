using System;
using System.ComponentModel.DataAnnotations;

namespace Tasker2.Controllers.Resource
{
    public class ProjectResource
    {
        public int ProjectId {get; set;}

        [Required]
        public string Title {get; set;}
        public string Description {get; set;}

        [Required]
        public DateTime Date {get; set;}
    }
}
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Tasker2.Models
{
    public class Project
    {
        public int ProjectId {get;set;}
        public string Title {get; set;}
        public string Description {get; set;}
        public DateTime Date {get; set;}

        public string UserId {get; set;}

        [ForeignKey("UserId")]
        public virtual IdentityUser User {get; set;}
        
    }
}
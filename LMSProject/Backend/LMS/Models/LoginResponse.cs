using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Models
{
    public class LoginResponse
    {
        public string token { get; set; }
        public string User_Id { get; set; }
        public string Role { get; set; }

        public string EmployeeName { get; set; }
    }
}
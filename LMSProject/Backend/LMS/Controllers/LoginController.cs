using LMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LMS.Data;
using LMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IAdminService _adminService;

        public LoginController(IAuthService authService, IAdminService adminService)
        {
            _authService = authService;
            _adminService = adminService;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(EmployeeViewModel login)
        {
            IActionResult response = Unauthorized();
            var employee = _authService.AuthenticateEmployee(login);

            if (employee != null)
            {
                var tokenString = _authService.GenerateJSONWebToken(employee);
                var employeeName = _adminService.GetEmployeeById(employee.EmployeeId).EmployeeName;

                response = Ok(new LoginResponse { token = tokenString, User_Id = login.Username, Role=employee.EmployeeRole, EmployeeName=employeeName });
            }

            return response;
        }  
    }
}

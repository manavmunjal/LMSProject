using LMS.Data;
using LMS.Models;
using LMS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Diagnostics;

namespace LMS.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        private readonly IEmployeeRepository _employeeDataRepository;
        public AuthService(IConfiguration config, IEmployeeRepository employeeDataRepository)
        {
            _config = config;
            _employeeDataRepository = employeeDataRepository;
        }
        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login)
        {
            EmployeeCredential employee = null;
            employee = _employeeDataRepository.GetEmployeeDetail(login);
            return employee;
        }

        public string GenerateJSONWebToken(EmployeeCredential employeeInfo)
        {

            if (employeeInfo is null)
            {
                throw new ArgumentNullException(nameof(employeeInfo));
            }
            List<Claim> claims = new List<Claim>();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            claims.Add(new Claim("Username", employeeInfo.EmployeeId));
            if (employeeInfo.EmployeeRole.Equals("admin"))
            {
                claims.Add(new Claim("role", "admin"));
            }
            else
            {
                claims.Add(new Claim("role", "customer"));

            }
            Debug.WriteLine(claims[0]);
            Debug.WriteLine(claims[claims.Count-1]);
            Debug.WriteLine("No of claims are ", claims.Count);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddHours(2),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public EmployeeCredential AuthenticateEmployee(EmployeeViewModel login)
        {
            EmployeeCredential employee = _employeeDataRepository.GetEmployeeDetail(login);
            return employee;
        }

        public string RegisterEmployee(RegisterViewModel e)
        {
            return _employeeDataRepository.RegisterEmployee(e); 
        }
    }
}
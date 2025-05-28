using LMS.Models;
using LMS.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

public record User(string id);

namespace LMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "customer,admin")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService=customerService;
        }


        [HttpGet("GetPurchasedItems")]
        public async Task<ActionResult> GetAllItems([FromQuery] User userParameters)
        {
            List<ItemViewModel> items =  _customerService.GetitemInformation(userParameters.id);
            return Ok(items);
        }

        [HttpGet("GetLoans")]
        public async Task<ActionResult> GetLoanDetails([FromQuery] User userParameters)
        {
            List<LoanViewModel> items = _customerService.GetLoanInformation(userParameters.id);
            return Ok(items);
        }

        
        [HttpPost("ApplyForLoan")]
        public IActionResult ApplyLoan(EmployeeIssueViewModel e)
        {
            var res = _customerService.ApplyForLoan(e);
            if (res[0]=='I')
            {
                return Ok(res);
            }
            else
            {
                return BadRequest(res);
            }
        }
    }
}

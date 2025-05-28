using LMS.Data;
using LMS.Models;

namespace LMS.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IEmployeeRepository _employeeDataRepository;
        public CustomerService(IEmployeeRepository employeeDataRepository)
        {
            _employeeDataRepository = employeeDataRepository;
        }
        public List<ItemViewModel> GetitemInformation(string id)
        {
            List<ItemViewModel> items = _employeeDataRepository.GetItemDetailsById(id);
            return items;
        }
        public List<LoanViewModel> GetLoanInformation(string id)
        {
            List<LoanViewModel> items = _employeeDataRepository.GetLoanDeatilsById(id);
            return items;
        }

        public string ApplyForLoan(EmployeeIssueViewModel e)
        {
            return _employeeDataRepository.ApplyForLoan(e);
        }

    }
}

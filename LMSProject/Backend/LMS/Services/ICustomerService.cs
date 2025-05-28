using LMS.Models;

namespace LMS.Services
{
    public interface ICustomerService
    {
        public List<ItemViewModel> GetitemInformation(String id);
        public List<LoanViewModel> GetLoanInformation(string id);
        public string ApplyForLoan(EmployeeIssueViewModel e);
    }
}

using LMS.Models;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Services
{
    public interface IAdminService
    {
        public string UpdateEmployee(EditEmployeeViewModel employee);
        public string UpdateLoan(LoanCardMaster l);
        public string UpdateItem(ItemMaster i);
        public List<EditEmployeeViewModel> GetEmployees();
        public EditEmployeeViewModel GetEmployeeById(string id);
        public Boolean DeleteLoanById(string id);
        public Boolean DeleteEmp(string id);
        public List<ItemMaster> GetItems();
        public List<LoanCardMaster> GetLoanCards();

        public Boolean DeleteItemById(string id);

        public string AddLoanCard(LoanViewModel e);
    }
}

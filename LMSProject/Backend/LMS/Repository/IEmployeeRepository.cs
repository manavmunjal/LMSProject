using LMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LMS.Data
{
    public interface IEmployeeRepository
    {
        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login);
        public string RegisterEmployee(RegisterViewModel e);
        public string ApplyForLoan(EmployeeIssueViewModel e);
        public string EditLoan(LoanCardMaster e);
        public string EditItem(ItemMaster e);
        public List<ItemViewModel> GetItemDetailsById(String id);
        public List<LoanViewModel> GetLoanDeatilsById(String id);
        public Boolean DeleteLoanById(String id);

        //public string UpdateEmployee(EditEmployeeViewModel employee);
        public List<EditEmployeeViewModel> GetEmployees();
        public string EditEmployee(EditEmployeeViewModel employee, String id);
        public Boolean DeleteEmployee(string id);
        public List<LoanCardMaster> GetLoansList();
        public EditEmployeeViewModel GetEmployeeById(string id);

        public Boolean DeleteItemById(String id);

        public string AddLoanCard(LoanViewModel e);
        public List<ItemMaster> GetItemsList();
    }
}
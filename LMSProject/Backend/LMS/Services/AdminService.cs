using LMS.Data;
using LMS.Models;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Services
{
    public class AdminService : IAdminService
    {
        private readonly IEmployeeRepository _employeeDataRepository;
        public AdminService(IEmployeeRepository employeeDataRepository)
        {
            _employeeDataRepository = employeeDataRepository;
        }

        public List<EditEmployeeViewModel> GetEmployees()
        {
            return _employeeDataRepository.GetEmployees();
        }

        public string UpdateEmployee(EditEmployeeViewModel employee)
       {
            return _employeeDataRepository.EditEmployee(employee, employee.EmployeeId);
        }
        public string UpdateLoan(LoanCardMaster l)
        {
            return _employeeDataRepository.EditLoan(l);
        }

        public string UpdateItem(ItemMaster i)
        {
            return _employeeDataRepository.EditItem(i);
        }

        public EditEmployeeViewModel GetEmployeeById(string id)
        {
            return _employeeDataRepository.GetEmployeeById(id);
        }

        public Boolean DeleteLoanById(string id)
        {
            return _employeeDataRepository.DeleteLoanById(id);
        }

        public Boolean DeleteEmp(string id)
        {
            return _employeeDataRepository.DeleteEmployee(id);
        }

        public List<ItemMaster> GetItems() 
        { 
            return _employeeDataRepository.GetItemsList();
        }

        public List<LoanCardMaster> GetLoanCards()
        {
            return _employeeDataRepository.GetLoansList();
        }

        public bool DeleteItemById(string id)
        {
            return _employeeDataRepository.DeleteItemById(id);
        }

        public string AddLoanCard(LoanViewModel e)
        {
            return _employeeDataRepository.AddLoanCard(e);
        }
    }
}

using LMS.Controllers;
using LMS.Models;
using LMS.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    public class EmployeeControllersTest
    {
        private Mock<IAdminService> AdminServiceObj;
        
        private AdminController adminController;
        private List<ItemMaster> itemsMaster = new List<ItemMaster>() { new ItemMaster() { ItemId="I0001", ItemCategory="Furniture", IssueStatus="Y", ItemDescription="Table", ItemMake="Wood", ItemValuation=5000 } };
        private List<LoanCardMaster> loansMaster = new List<LoanCardMaster>() { new LoanCardMaster() { LoanId="L0002", LoanType="Furniture", DurationInYears=2, Valuation=5000 } };

        [SetUp]
        public void Setup()
        {
            AdminServiceObj = new Mock<IAdminService>();

            adminController = new AdminController(AdminServiceObj.Object);
        }

    
        [Test]
        public void GetItems_Test()
        {
            AdminServiceObj.Setup(_ => _.GetItems()).Returns(itemsMaster);
            Task result = adminController.GetItems();
            Assert.That(result, Is.InstanceOf<Task<ActionResult>>());
            Task<ActionResult> taskResult = (Task<ActionResult>)result;
            System.Diagnostics.Debug.WriteLine(taskResult.Result);
            //Assert.That(taskResult.Result, Is.AssignableTo<ItemMaster>());
        }

        [Test]
        public void GetLoans_Test()
        {
            AdminServiceObj.Setup(_ => _.GetLoanCards()).Returns(loansMaster);
            Task result = adminController.GetLoans();
            Assert.That(result,Is.InstanceOf<Task<ActionResult>>());
            Task<ActionResult> taskResult = (Task<ActionResult>)result;
            System.Diagnostics.Debug.WriteLine(taskResult.Result);
        }
    }
}

using LMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Runtime.Intrinsics.Arm;

namespace LMS.Data
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly GisdbContext _db;
        public EmployeeRepository(GisdbContext db)
        {
            _db = db;
        }

        public EmployeeCredential GetEmployeeDetail(EmployeeViewModel login)
        {
            //return users.SingleOrDefault(x => x.EmployeeId == login.Username && x.EmployeePassword == login.Password);
            return _db.EmployeeCredentials.SingleOrDefault(x => x.EmployeeId == login.Username && x.EmployeePassword == login.Password);
        }

        public List<EditEmployeeViewModel> GetEmployees()
        {
            var query = from emp in _db.EmployeeMasters
                        select new EditEmployeeViewModel() { EmployeeId = emp.EmployeeId, EmployeeName = emp.EmployeeName, Designation = emp.Designation, Gender = emp.Gender, Department = emp.Department, DateOfBirth = emp.DateOfBirth, DateOfJoining = emp.DateOfJoining};
        
            List<EditEmployeeViewModel> list = query.ToList();
            return list;
        }

        public Boolean DeleteEmployee(String id)
        {
            try
            {
                // _db.EmployeeMasters.Where(e => e.EmployeeId == id).ExecuteDelete();
                // var emp = _db.EmployeeMasters.Include(e => e.EmployeeIssueDetails).Includ
               var query1 = from item in _db.ItemMasters
                                join issue in _db.EmployeeIssueDetails
                                on item.ItemId equals issue.ItemId
                                where issue.EmployeeId == id
                                select item;
             
                foreach(var item in query1)
                {
                    _db.ItemMasters.Remove(item);
                }

                var query2 = from loan in _db.LoanCardMasters
                             join issue in _db.EmployeeCardDetails
                             on loan.LoanId equals issue.LoanId
                             where issue.EmployeeId == id
                             select loan;

                foreach(var item in query2)
                {
                    _db.LoanCardMasters.Remove(item);
                }


                // _db.EmployeeCardDetails.Where(e => e.EmployeeId == id).ExecuteDelete();
                // _db.EmployeeIssueDetails.Where(e => e.EmployeeId == id).ExecuteDelete();
                // _db.EmployeeMasters.Where(e => e.EmployeeId == id).ExecuteDelete();
                _db.EmployeeCredentials.Where(e => e.EmployeeId == id).ExecuteDelete();
                // _db.EmployeeMasters.Remove(emp);
                _db.SaveChanges();
                return true;
            }
            catch (Exception exp)
            {
                Debug.WriteLine(exp.Message);
                return false;
            }
        }

        public EditEmployeeViewModel GetEmployeeById(string id)
        {
            try
            {
                var query1 = from emp in _db.EmployeeMasters
                             where emp.EmployeeId == id
                             select new EditEmployeeViewModel() { EmployeeId = emp.EmployeeId, EmployeeName = emp.EmployeeName, Designation = emp.Designation, Gender = emp.Gender, Department = emp.Department, DateOfBirth = emp.DateOfBirth, DateOfJoining = emp.DateOfJoining };

                List<EditEmployeeViewModel> employee = query1.ToList();
                return employee[0];
            }
            catch
            {
                return new EditEmployeeViewModel();
            }
        }

        public string EditEmployee(EditEmployeeViewModel e, string id)
        {
            try
            {
                EmployeeCredential ec = _db.EmployeeCredentials.Find(id);

                EmployeeMaster newEmp = new EmployeeMaster()
                {
                    EmployeeId = e.EmployeeId,
                    EmployeeName = e.EmployeeName,
                    Designation = e.Designation,
                    Department = e.Department,
                    Gender = e.Gender,
                    DateOfBirth = e.DateOfBirth,
                    DateOfJoining = e.DateOfJoining,
                    Employee = ec
                };

                if (newEmp.DateOfJoining>newEmp.DateOfBirth)
                {
                    _db.EmployeeMasters.Update(newEmp);
                    _db.SaveChanges();

                    return id;
                    
                }

                return "Invalid entries";
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }

        public string RegisterEmployee(RegisterViewModel e)
        {
            try
            {
                var query1 = from emp in _db.EmployeeMasters
                             select emp.EmployeeId;
                List<String> _items = query1.ToList();
                int min = 1000;
                int max = 9999;
                Random _rdm = new Random();
                String empId = "E" + _rdm.Next(min, max);
                while(_items.Contains(empId)) {
                    empId = "E" + _rdm.Next(min, max);
                }

                EmployeeCredential c = new EmployeeCredential() {EmployeeId = empId, EmployeePassword = e.Employee.EmployeePassword, EmployeeRole = e.Employee.EmployeeRole};
                EmployeeMaster newEmp = new EmployeeMaster()
                {
                    EmployeeId = empId,
                    EmployeeName = e.EmployeeName,
                    Designation = e.Designation,
                    Department = e.Department,
                    Gender = e.Gender,
                    DateOfBirth = e.DateOfBirth,
                    DateOfJoining = e.DateOfJoining,
                    Employee = c
                };
                if (newEmp.DateOfJoining > newEmp.DateOfBirth)
                {
                    _db.EmployeeCredentials.Add(c);
                    _db.SaveChanges();
                    _db.EmployeeMasters.Add(newEmp);
                    _db.SaveChanges();
                    return empId;
                }
                
                return "Invalid entries";
            } 
            catch (Exception exp)
            {
                return exp.Message;
            }
        }

        public List<ItemViewModel> GetItemDetailsById(String id)
        {
            try
            {
                var query1 = from item in _db.ItemMasters
                              join issue in _db.EmployeeIssueDetails
                              on item.ItemId equals issue.ItemId
                              where issue.EmployeeId == id
                              select new ItemViewModel() { ItemId = item.ItemId, IssueStatus=item.IssueStatus, ItemDescription=item.ItemDescription, 
                              ItemCategory=item.ItemCategory, ItemMake=item.ItemMake, ItemValuation=item.ItemValuation, ReturnDate=issue.ReturnDate};

                List<ItemViewModel> _items = query1.ToList();
                return _items;
            }
            catch
            {
                return new List<ItemViewModel>();
            }
        }

        public List<LoanViewModel> GetLoanDeatilsById(String id)
        {
            try
            {
                var query1 = from loan in _db.LoanCardMasters
                             join issue in _db.EmployeeCardDetails
                             on loan.LoanId equals issue.LoanId
                             where issue.EmployeeId == id
                             select new LoanViewModel(){ LoanId = loan.LoanId, LoanType = loan.LoanType, DurationInYears = loan.DurationInYears, Valuation=loan.Valuation ,CardIssueDate = issue.CardIssueDate };

                List<LoanViewModel> _items = query1.ToList();
                return _items;
            }
            catch
            {
                return new List<LoanViewModel>();
            }
        }

        public string ApplyForLoan(EmployeeIssueViewModel e)
        {
            try
            {
                var query1 = from emp in _db.EmployeeCardDetails
                             where emp.EmployeeId==e.EmployeeID
                             select emp.LoanId;
                             
                List<String> _items = query1.ToList();

                var query2=from loan in _db.LoanCardMasters
                           where _items.Contains(loan.LoanId)
                           select loan.LoanType;

                List<String> _categories = query2.ToList();
                
                int min = 1000;
                int max = 9999;
                Random _rdm = new Random();
                string _loanId;
                
                DateTime _returnDate;
                if (_categories.Contains(e.ItemCategory))
                {
                    var query3 = (from loan in _db.LoanCardMasters
                                    where (_items.Contains(loan.LoanId) && loan.LoanType==e.ItemCategory)
                                    select new {duration= loan.DurationInYears,loanId= loan.LoanId}).ToList();
                    _loanId=query3[0].loanId;
                    var query4 = (from loan in _db.EmployeeCardDetails
                                 where loan.LoanId==_loanId
                                 select loan.CardIssueDate).ToArray();
                    int _duration = (int)query3[0].duration;
                    DateTime _cardIssueDate = (DateTime)query4[0];                    
                    _returnDate = _cardIssueDate.AddYears(_duration);

                    _db.LoanCardMasters.FirstOrDefault(l => l.LoanId == _loanId).Valuation+=e.ItemValue;
                    _db.SaveChanges();
                }
                else
                {
                    var query5 = from loan in _db.LoanCardMasters
                                 select loan.LoanId;
                    List<String> _loanIDS = query5.ToList();

                    _loanId="L"+_rdm.Next(min, max);
                    
                    while (_loanIDS.Contains(_loanId))
                    {
                        _loanId = "L" + _rdm.Next(min, max);
                    }
                    LoanCardMaster newLoan = new LoanCardMaster() { LoanId=_loanId, LoanType=e.ItemCategory, DurationInYears=1,Valuation=e.ItemValue };
                    _db.LoanCardMasters.Add(newLoan);
                    _db.SaveChanges();

                    EmployeeCardDetail newCard = new EmployeeCardDetail() { EmployeeId=e.EmployeeID, LoanId=_loanId, CardIssueDate=DateTime.Now };
                    _db.EmployeeCardDetails.Add(newCard);
                    _db.SaveChanges();
                    _returnDate = DateTime.Now.AddYears(1);

                }

                //inserting into item_master
                var query6 = from item in _db.ItemMasters
                             select item.ItemId;
                List<String> _itemIDS = query6.ToList();
                String itemId = "I"+_rdm.Next(min, max);

                while (_itemIDS.Contains(itemId))
                {
                    itemId = "I" + _rdm.Next(min, max);
                }

                var query7 = from item in _db.EmployeeIssueDetails
                             select item.IssueId;
                List<String> _issueIDS = query7.ToList();
                String issueId = "IS"+_rdm.Next(min, max);

                while (_issueIDS.Contains(issueId))
                {
                    issueId = "IS"+_rdm.Next(min, max);
                }


                ItemMaster newItem=new ItemMaster() { ItemId=itemId, IssueStatus="Y", ItemDescription=e.ItemDescription, ItemMake=e.ItemMake, ItemCategory=e.ItemCategory, ItemValuation=e.ItemValue };
                _db.ItemMasters.Add(newItem);
                _db.SaveChanges();

                EmployeeIssueDetail newIssue=new EmployeeIssueDetail() { IssueId=issueId,EmployeeId=e.EmployeeID,ItemId=itemId,IssueDate= DateTime.Now,ReturnDate=_returnDate };
                _db.EmployeeIssueDetails.Add(newIssue);
                _db.SaveChanges();

                return itemId;
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }

        public List<ItemMaster> GetItemsList() {
            var query = from item in _db.ItemMasters select item;

            List<ItemMaster> list = query.ToList();
            return list;
        }

        public List<LoanCardMaster> GetLoansList()
        {
            var query = from loan in _db.LoanCardMasters select loan;

            List<LoanCardMaster> list = query.ToList();
            return list;
        }
        public string EditLoan(LoanCardMaster e)
        {
            try
            {
                    LoanCardMaster newLoan = new LoanCardMaster()
                    {
                        LoanId=e.LoanId,
                        LoanType=e.LoanType,
                        DurationInYears=e.DurationInYears,
                        Valuation=e.Valuation
                    };

                    _db.LoanCardMasters.Update(newLoan);
                    _db.SaveChanges();

                return e.LoanId;
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }

        public string EditItem(ItemMaster e)
        {
            try
            {
                ItemMaster newItem = new ItemMaster()
                {
                    ItemId=e.ItemId,
                    ItemCategory=e.ItemCategory,
                    ItemDescription=e.ItemDescription,
                    ItemValuation=e.ItemValuation,
                    IssueStatus=e.IssueStatus,
                    ItemMake=e.ItemMake
                };

                _db.ItemMasters.Update(newItem);
                _db.SaveChanges();

                return e.ItemId;
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }
        public Boolean DeleteLoanById(String id)
        {
            try
            {
                var query1 = from emp in _db.EmployeeCardDetails
                             where emp.LoanId==id
                             select emp.EmployeeId;

                Console.WriteLine(id);
                
                string _empId = query1.ToList()[0];
                Console.WriteLine(query1);

                var query2 = from loan in _db.LoanCardMasters
                             where loan.LoanId==id
                             select loan.LoanType;

                string _category = query2.ToList()[0];

                var query3 = (from issue in _db.EmployeeIssueDetails
                              join item in _db.ItemMasters
                              on issue.ItemId equals item.ItemId
                              where issue.EmployeeId == _empId && item.ItemCategory == _category
                              select item.ItemId).ToList();

                foreach (var x in query3)
                {
                    
                    _db.EmployeeIssueDetails.Where(e => e.ItemId == x).ExecuteDelete();
                    _db.SaveChangesAsync();
                    _db.ItemMasters.Where(e => e.ItemId == x).ExecuteDelete();
                    _db.SaveChangesAsync();

                }

                _db.EmployeeCardDetails.Where(e => e.LoanId == id).ExecuteDelete();
                _db.SaveChangesAsync();
                _db.LoanCardMasters.Where(e => e.LoanId == id).ExecuteDelete();
                _db.SaveChangesAsync();
                return true;
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp.Message);
                return false;
            }
        }

        public bool DeleteItemById(string id)
        {
            try
            {
                _db.EmployeeIssueDetails.Where(e => e.ItemId == id).ExecuteDelete();
                _db.SaveChangesAsync(true);
                _db.ItemMasters.Where(e => e.ItemId == id).ExecuteDelete();
                _db.SaveChangesAsync(true);
                return true;
            }
            catch (Exception exp)
            {
                Console.WriteLine(exp.Message);
                return false;
            }
        }

        public string AddLoanCard(LoanViewModel e)
        {
            int min = 1000;
            int max = 9999;
            Random _rdm = new Random();
            string _loanId;

            try
            {
                var query5 = from loan in _db.LoanCardMasters
                             select loan.LoanId;
                List<String> _loanIDS = query5.ToList();

                _loanId = "L" + _rdm.Next(min, max);

                while (_loanIDS.Contains(_loanId))
                {
                    _loanId = "L" + _rdm.Next(min, max);
                }
                LoanCardMaster newLoan = new LoanCardMaster() { LoanId = _loanId, LoanType = e.LoanType, DurationInYears = e.DurationInYears, Valuation = 0 };
                _db.LoanCardMasters.Add(newLoan);
                _db.SaveChanges();

                EmployeeCardDetail newCard = new EmployeeCardDetail() { EmployeeId = e.EmployeeId, LoanId = _loanId, CardIssueDate = DateTime.Now };
                _db.EmployeeCardDetails.Add(newCard);
                _db.SaveChanges();

                return _loanId;
            }
            catch (Exception exp)
            {
                return exp.Message;
            }
        }
    }
}
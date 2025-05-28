using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LMS.Models;

public partial class EmployeeCardDetail
{
    public string? EmployeeId { get; set; }

    [Key]
    public string? LoanId { get; set; }

    public DateTime? CardIssueDate { get; set; }

    public virtual EmployeeMaster? Employee { get; set; }

    public virtual LoanCardMaster? Loan { get; set; }
}

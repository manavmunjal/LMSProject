using System;
using System.Collections.Generic;

namespace LMS.Models;

public partial class EmployeeMaster
{
    public string EmployeeId { get; set; } = null!;

    public string EmployeeName { get; set; } = null!;

    public string? Designation { get; set; }

    public string? Department { get; set; }

    public string? Gender { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public DateTime? DateOfJoining { get; set; }

    public virtual EmployeeCredential Employee { get; set; } = null!;

    public virtual ICollection<EmployeeIssueDetail> EmployeeIssueDetails { get; set; } = new List<EmployeeIssueDetail>();
}

using System;
using System.Collections.Generic;

namespace LMS.Models;

public partial class EmployeeCredential
{
    public string EmployeeId { get; set; } = null!;

    public string EmployeePassword { get; set; } = null!;

    public string EmployeeRole { get; set; } = null!;

    public virtual EmployeeMaster? EmployeeMaster { get; set; }
}

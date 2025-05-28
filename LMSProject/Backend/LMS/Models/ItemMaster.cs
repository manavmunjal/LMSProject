using System;
using System.Collections.Generic;

namespace LMS.Models;

public partial class ItemMaster
{
    public string ItemId { get; set; } = null!;

    public string? IssueStatus { get; set; }

    public string? ItemDescription { get; set; }

    public string? ItemMake { get; set; }

    public string? ItemCategory { get; set; }

    public int? ItemValuation { get; set; }

    public virtual ICollection<EmployeeIssueDetail> EmployeeIssueDetails { get; set; } = new List<EmployeeIssueDetail>();

    public virtual Category? ItemCategoryNavigation { get; set; }

    public virtual Material? ItemMakeNavigation { get; set; }
}

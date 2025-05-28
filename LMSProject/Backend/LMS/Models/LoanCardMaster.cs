using System;
using System.Collections.Generic;

namespace LMS.Models;

public partial class LoanCardMaster
{
    public string LoanId { get; set; } = null!;

    public string? LoanType { get; set; }

    public int? DurationInYears { get; set; }

    public int? Valuation { get; set; }

    public virtual Category? LoanTypeNavigation { get; set; }
}

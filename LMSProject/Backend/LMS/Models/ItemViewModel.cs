using System;
using System.Collections.Generic;

namespace LMS.Models;

public partial class ItemViewModel
{
    public string ItemId { get; set; } = null!;

    public string? IssueStatus { get; set; }

    public string? ItemDescription { get; set; }

    public string? ItemMake { get; set; }

    public string? ItemCategory { get; set; }

    public int? ItemValuation { get; set; }

    public DateTime? ReturnDate { get; set; }
}

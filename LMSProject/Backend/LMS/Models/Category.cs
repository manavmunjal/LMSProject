using System;
using System.Collections.Generic;

namespace LMS.Models;

public partial class Category
{
    public string Category1 { get; set; } = null!;

    public virtual ICollection<ItemMaster> ItemMasters { get; set; } = new List<ItemMaster>();

    public virtual ICollection<LoanCardMaster> LoanCardMasters { get; set; } = new List<LoanCardMaster>();
}

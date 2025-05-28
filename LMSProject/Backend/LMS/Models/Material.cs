using System;
using System.Collections.Generic;

namespace LMS.Models;

public partial class Material
{
    public string Material1 { get; set; } = null!;

    public virtual ICollection<ItemMaster> ItemMasters { get; set; } = new List<ItemMaster>();
}

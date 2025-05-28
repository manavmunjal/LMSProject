namespace LMS.Models
{
    public class EmployeeIssueViewModel
    {
        public string EmployeeID { get; set; } = null!;
        public string ItemCategory { get; set; } = null!;
        public string ItemDescription { get; set; } = null!;
        public string ItemMake { get; set; } = null!;
        public int ItemValue { get; set; }
               

    }
}

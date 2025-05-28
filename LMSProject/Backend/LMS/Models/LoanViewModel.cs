namespace LMS.Models
{
    public class LoanViewModel
    {
        public string? LoanId { get; set; } = null!;

        public string? LoanType { get; set; }

        public int? DurationInYears { get; set; }

        public DateTime? CardIssueDate { get; set; }

        public int? Valuation { get; set; }

        public string? EmployeeId { get; set; }
    }
}

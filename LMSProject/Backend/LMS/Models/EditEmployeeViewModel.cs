namespace LMS.Models
{
    public class EditEmployeeViewModel
    {
        public string EmployeeId { get; set; } = null!;

        public string EmployeeName { get; set; } = null!;

        public string? Designation { get; set; }

        public string? Department { get; set; }

        public string? Gender { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public DateTime? DateOfJoining { get; set; }
    }
}

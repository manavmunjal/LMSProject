[Serializable]
public class EmployeeNotFoundException : Exception
{
    public string Msg { get; }

    public EmployeeNotFoundException() { }

    public EmployeeNotFoundException(string message)
        : base(message) { 
        Msg = message;
    }
}


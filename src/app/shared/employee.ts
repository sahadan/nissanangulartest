export class Employee {
    EmployeeId: number = 0;
    EmployeeName: string = '';
    Designation: string = '';
    DateOfJoining: Date = new Date;
    Contact: string = '';
    DepartmentId: number = 0;
    IsActive: boolean=false;

}

// Parent Child Relation --- Employee FK    -- Department PK
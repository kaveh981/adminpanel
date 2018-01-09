interface IEmployee {
    family: string;
    name: string;
    email: string;
    employeeId: Number;
}

interface UpdateEmployee {
    family: string;
    name: string;
    id: number;
}

interface UpdateEmployeeEmail {
    email: string;
    password: string;
    id: number;
}

interface ResponseDetails {
    success: boolean;
    message: string;
}
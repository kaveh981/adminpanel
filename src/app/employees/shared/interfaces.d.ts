interface IEmployee {
    family: string;
    name: string;
    email: string;
    employeeId: Number;
}

interface AddEmployee {
    family: string;
    name: string;
    email: string;
    password: string;
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

interface UpdateEmployeePassword {
    oldPassword: string;
    newPassword: string;
    id: number;
}

interface ResponseDetails {
    success: boolean;
    message: string;
}

interface Credential {
    username: string;
    password: string;
}

interface AuthReturn {
    user: { userId: number, clientId: number };
    token: {
        accessToken: string,
        refreshToken: string
    }
}

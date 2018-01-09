export interface IEmployee {
  family: string;
  name: string;
  email: string;
  employeeId: Number;
}

export interface UpdateEmployee {
  family: string;
  name: string;
  id: number;
}

export interface UpdateEmployeeEmail {
  email: string;
  password: string;
  id: number;
}

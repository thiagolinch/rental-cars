interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driver_license: string;
    isAdmin?: Boolean;
    id?: string;
    avatar?: string;
}

export { ICreateUserDTO }
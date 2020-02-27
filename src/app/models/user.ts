export interface UserForgotPasswordCredentials {
    email: string;
}

export interface UserLoginCredentials {
    username: string;
    password: string;
}

export interface UserSignUpCredentials {
    username: string;
    password: string;
    secondaryFields: {
        name: string;
        email: string;
    }
}

export interface User {
    username: string;
    password: string;
    name: string;
    email: string;
}

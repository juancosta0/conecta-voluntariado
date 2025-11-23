export enum UserType {
    VOLUNTEER = 'volunteer',
    NGO = 'ngo'
}

export interface User {
    id: number;
    userType: UserType;
    email: string;
    username: string;
    password?: string;
    token?: string;

    // Campos comuns
    name: string;
    phone?: string;
    avatar?: string;

    // Campos específicos de voluntário
    interests?: string[];
    skills?: string[];
    availability?: string;
    bio?: string;

    // Campos específicos de ONG
    organizationName?: string;
    cnpj?: string;
    description?: string;
    website?: string;
    address?: string;
}

export interface Organization {
    id: number | string;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    volunteers: number;
    projects: number;
    ngoId?: number | string;
    email: string;
    phone: string;
    website: string;
}

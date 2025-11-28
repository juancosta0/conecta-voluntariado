export interface Organization {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    volunteers: number;
    projects: number;
    ngoId?: number;
    email: string;
    phone: string;
    website: string;
}

export enum ApplicationStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

export interface Application {
    id: number;
    opportunityId: number;
    volunteerId: number;
    status: ApplicationStatus;
    appliedDate: string;
    message?: string;
    // Dados desnormalizados para facilitar exibição
    opportunityTitle?: string;
    volunteerName?: string;
}

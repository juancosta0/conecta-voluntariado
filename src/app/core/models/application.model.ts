export enum ApplicationStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

export interface Application {
    id: number;
    opportunityId: number;
    volunteerId: number;
    volunteerEmail?: string;
    volunteerName?: string;
    opportunityTitle?: string;
    status: ApplicationStatus;
    appliedDate: string;
    message?: string;
}

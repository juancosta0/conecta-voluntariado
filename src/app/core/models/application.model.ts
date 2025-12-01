export enum ApplicationStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

export interface Application {
    id: number | string;
    opportunityId: number | string;
    userId: number | string;
    volunteerId?: number; // Deprecated, kept for backward compatibility if needed
    volunteerEmail?: string;
    volunteerName?: string;
    opportunityTitle?: string;
    status: ApplicationStatus;
    appliedDate: string;
    message?: string;
    user?: any; // Expanded user object
    opportunity?: any; // Expanded opportunity object
}

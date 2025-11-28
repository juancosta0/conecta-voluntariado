export enum NotificationType {
    APPLICATION = 'application',
    ACCEPTANCE = 'acceptance',
    REJECTION = 'rejection',
    GENERAL = 'general'
}

export interface Notification {
    id: number | string;
    userId: number | string;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    createdAt: string;
    relatedId?: number | string; // ID of related entity (e.g., application ID)
}

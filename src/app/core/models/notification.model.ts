export enum NotificationType {
    APPLICATION = 'application',
    ACCEPTANCE = 'acceptance',
    REJECTION = 'rejection',
    GENERAL = 'general'
}

export interface Notification {
    id: number;
    userId: number;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    createdAt: string;
    relatedId?: number; // ID of related entity (e.g., application ID)
}

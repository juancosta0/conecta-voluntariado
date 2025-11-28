import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from './data.service';
import { Notification, NotificationType } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private dataService = inject(DataService);

    getNotifications(userId: number | string): Observable<Notification[]> {
        return this.dataService.getNotifications().pipe(
            map(notifications => notifications
                .filter(n => String(n.userId) === String(userId))
                .map(n => ({
                    ...n,
                    createdAt: (n as any).date || n.createdAt, // Handle legacy 'date' field
                    type: n.type as NotificationType
                }))
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            )
        );
    }

    markAsRead(id: number | string): Observable<any> {
        return this.dataService.updateItem('notifications', id, { read: true });
    }

    markAllAsRead(userId: number | string): Observable<any> {
        return this.getNotifications(userId).pipe(
            map(notifications => {
                const unread = notifications.filter(n => !n.read);
                unread.forEach(n => {
                    this.dataService.updateItem('notifications', n.id, { read: true }).subscribe();
                });
                return true;
            })
        );
    }

    createNotification(notification: Partial<Notification>): Observable<Notification> {
        const newNotification = {
            ...notification,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            read: false
        };
        return this.dataService.addItem('notifications', newNotification);
    }

    getUnreadCount(userId: number | string): Observable<number> {
        return this.getNotifications(userId).pipe(
            map(notifications => notifications.filter(n => !n.read).length)
        );
    }
}

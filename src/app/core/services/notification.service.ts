import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification, NotificationType } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000';

    getNotifications(userId: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/notifications?userId=${userId}&_sort=createdAt&_order=desc`);
    }

    getUnreadNotifications(userId: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/notifications?userId=${userId}&read=false&_sort=createdAt&_order=desc`);
    }

    markAsRead(notificationId: number): Observable<Notification> {
        return this.http.patch<Notification>(`${this.apiUrl}/notifications/${notificationId}`, { read: true });
    }

    markAllAsRead(userId: number): Observable<void> {
        // This would need a custom endpoint in a real API
        // For json-server, we'll need to update each notification individually
        return new Observable(observer => {
            this.getUnreadNotifications(userId).subscribe(notifications => {
                const updates = notifications.map(n => this.markAsRead(n.id));
                Promise.all(updates.map(obs => obs.toPromise())).then(() => {
                    observer.next();
                    observer.complete();
                });
            });
        });
    }

    createNotification(notification: Partial<Notification>): Observable<Notification> {
        return this.http.post<Notification>(`${this.apiUrl}/notifications`, {
            ...notification,
            createdAt: new Date().toISOString(),
            read: false
        });
    }

    deleteNotification(notificationId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/notifications/${notificationId}`);
    }
}

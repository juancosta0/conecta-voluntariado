import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    standalone: false
})
export class NotificationsComponent implements OnInit {
    private authService = inject(AuthService);
    private notificationService = inject(NotificationService);

    notifications = signal<Notification[]>([]);
    unreadCount = signal(0);
    isOpen = false;

    ngOnInit() {
        this.loadNotifications();
        // Poll for new notifications every 30 seconds
        setInterval(() => this.loadNotifications(), 30000);
    }

    loadNotifications() {
        const user = this.authService.currentUser();
        if (user) {
            this.notificationService.getNotifications(user.id).subscribe(notifications => {
                this.notifications.set(notifications);
                this.unreadCount.set(notifications.filter(n => !n.read).length);
            });
        }
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    markAsRead(notification: Notification) {
        if (!notification.read) {
            this.notificationService.markAsRead(notification.id).subscribe(() => {
                this.loadNotifications();
            });
        }
    }

    markAllAsRead() {
        const user = this.authService.currentUser();
        if (user) {
            this.notificationService.markAllAsRead(user.id).subscribe(() => {
                this.loadNotifications();
            });
        }
    }

    getNotificationIcon(type: string): string {
        const icons: { [key: string]: string } = {
            'application': 'mail',
            'acceptance': 'check_circle',
            'rejection': 'cancel',
            'general': 'notifications'
        };
        return icons[type] || 'notifications';
    }

    getTimeAgo(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return 'agora mesmo';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} min atrás`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} h atrás`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} d atrás`;
        return date.toLocaleDateString('pt-BR');
    }
}

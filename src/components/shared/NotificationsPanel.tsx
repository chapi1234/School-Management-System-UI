import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Notification } from '../../lib/types';
import { Bell, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
}

export function NotificationsPanel({ notifications, onMarkAsRead }: NotificationsPanelProps) {
  const iconMap = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
  };

  const colorMap = {
    info: '#3b82f6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  return (
    <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            {notifications.filter(n => !n.read).length} New
          </Badge>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-2 p-4">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type];
            const color = colorMap[notification.type];
            
            return (
              <div
                key={notification.id}
                className={`group rounded-xl border p-3 transition-all hover:border-white/20 ${
                  notification.read 
                    ? 'border-white/5 bg-transparent' 
                    : 'border-white/10 bg-gradient-to-br from-white/10 to-transparent'
                }`}
              >
                <div className="flex gap-3">
                  <div 
                    className="rounded-lg p-2"
                    style={{ 
                      background: `${color}20`,
                      color: color
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{notification.title}</h4>
                        <p className="mt-1 text-xs text-gray-400">{notification.message}</p>
                        <p className="mt-2 text-xs text-gray-500">{notification.time}</p>
                      </div>
                      {!notification.read && onMarkAsRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onMarkAsRead(notification.id)}
                          className="h-6 text-xs hover:bg-white/5"
                        >
                          Mark read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {notifications.length === 0 && (
            <div className="py-8 text-center text-gray-400">
              No notifications
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}

import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Announcement, Role } from '../../lib/types';
import { Megaphone, Calendar } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface AnnouncementsPanelProps {
  announcements: Announcement[];
  currentRole: Role;
}

export function AnnouncementsPanel({ announcements, currentRole }: AnnouncementsPanelProps) {
  const filteredAnnouncements = announcements.filter(
    announcement => announcement.target.includes(currentRole)
  );

  const roleColors: Record<Role, string> = {
    principal: '#8b5cf6',
    teacher: '#3b82f6',
    student: '#06b6d4',
  };

  return (
    <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-purple-400" />
          <h3 className="font-semibold">Announcements</h3>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-3 p-4">
          {filteredAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4 transition-all hover:border-white/20 hover:from-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold">{announcement.title}</h4>
                  <p className="mt-2 text-sm text-gray-400">{announcement.content}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className="border-white/20"
                      style={{ 
                        borderColor: roleColors[announcement.role],
                        color: roleColors[announcement.role]
                      }}
                    >
                      {announcement.author}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(announcement.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAnnouncements.length === 0 && (
            <div className="py-8 text-center text-gray-400">
              No announcements available
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}

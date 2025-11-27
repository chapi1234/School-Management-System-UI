import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-400">{title}</p>
            <h3 className="mt-2 text-3xl">{value}</h3>
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <span className={`text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            )}
          </div>
          <div 
            className="rounded-2xl p-3 backdrop-blur-sm"
            style={{ 
              background: `linear-gradient(135deg, ${color}40, ${color}20)`,
              boxShadow: `0 0 20px ${color}30`
            }}
          >
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ 
          background: `linear-gradient(90deg, ${color}, ${color}80, transparent)` 
        }}
      />
    </Card>
  );
}

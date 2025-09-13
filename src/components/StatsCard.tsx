import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ title, value, description, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className={`flex items-center text-sm ${
              trend.isPositive ? "text-success" : "text-destructive"
            }`}>
              <span className="font-medium">
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
};
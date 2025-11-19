import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
};

type TaskBarProps = {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onTaskClick?: (taskId: string) => void;
};

export function TaskBar({ tasks, onTaskToggle, onTaskClick }: TaskBarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const allCompleted = completedCount === totalCount && totalCount > 0;

  if (allCompleted) return null;

  return (
    <Card
      className="bg-card border-border shadow-sm"
      data-testid="card-task-bar"
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="font-display font-bold text-lg" data-testid="text-task-title">
                  Complete Your Profile
                </h3>
                <span className="text-sm text-muted-foreground" data-testid="text-task-progress">
                  {completedCount} of {totalCount} complete
                </span>
              </div>
              <span className="text-sm font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2"
              data-testid="progress-tasks"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid="button-task-toggle"
            className="ml-4"
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-md hover-elevate cursor-pointer transition-colors",
                  task.completed && "opacity-50"
                )}
                onClick={() => onTaskClick?.(task.id)}
                data-testid={`task-item-${task.id}`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTaskToggle(task.id);
                  }}
                  className="mt-0.5"
                  data-testid={`button-task-toggle-${task.id}`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={cn("font-medium", task.completed && "line-through")}>
                    {task.title}
                    {task.required && (
                      <span className="ml-2 text-xs text-muted-foreground">(Required)</span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

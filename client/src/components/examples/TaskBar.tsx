import { useState } from "react";
import { TaskBar, type Task } from "../TaskBar";

export default function TaskBarExample() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Add dependent information",
      description: "Add details about your family members covered under your plan",
      completed: false,
      required: true,
    },
    {
      id: "2",
      title: "Upload insurance card",
      description: "Take a photo of your insurance card for easy access",
      completed: true,
      required: true,
    },
    {
      id: "3",
      title: "Verify phone number",
      description: "Confirm your phone number for appointment reminders",
      completed: false,
      required: false,
    },
    {
      id: "4",
      title: "Complete health assessment",
      description: "Help us understand your healthcare needs better",
      completed: false,
      required: false,
    },
  ]);

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
    console.log('Task toggled:', taskId);
  };

  const handleTaskClick = (taskId: string) => {
    console.log('Task clicked:', taskId);
  };

  return (
    <div className="p-8">
      <TaskBar 
        tasks={tasks} 
        onTaskToggle={handleTaskToggle}
        onTaskClick={handleTaskClick}
      />
    </div>
  );
}

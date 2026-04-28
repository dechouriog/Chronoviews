export type Task = {
  id: string
  name: string
  category: string
  color: string
  totalHours: number
}

export const tasks: Task[] = [
  {
    id: '1',
    name: 'Morning Run',
    category: 'Fitness',
    color: '#10B981',
    totalHours: 12.5,
  },
  {
    id: '2',
    name: 'Deep Work Session',
    category: 'Work',
    color: '#3B82F6',
    totalHours: 48,
  },
  {
    id: '3',
    name: 'Vue.js Course',
    category: 'Study',
    color: '#8B5CF6',
    totalHours: 20,
  },
  {
    id: '4',
    name: 'Evening Meditation',
    category: 'Spirituality',
    color: '#A855F7',
    totalHours: 8,
  },
  {
    id: '5',
    name: 'Family Dinner',
    category: 'Family',
    color: '#F59E0B',
    totalHours: 15,
  },
]
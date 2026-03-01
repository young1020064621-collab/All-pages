import { useMemo } from 'react';
import { Task, Meeting, Coaching } from './mockData';

interface FilterOptions {
  timeRange: string;
  tenant: string;
  user: string;
  startDate?: string;
  endDate?: string;
}

export const useFilteredData = (
  tasks: Task[],
  meetings: Meeting[],
  coaching: Coaching[],
  filters: FilterOptions
) => {
  return useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000);
    const next7Days = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000);
    const next14Days = new Date(startOfToday.getTime() + 14 * 24 * 60 * 60 * 1000);
    const next30Days = new Date(startOfToday.getTime() + 30 * 24 * 60 * 60 * 1000);

    const filterByDate = (date: Date) => {
      const itemDate = new Date(date);
      
      // Handle custom date range
      if (filters.timeRange === 'Custom' && filters.startDate && filters.endDate) {
        const customStart = new Date(filters.startDate);
        const customEnd = new Date(filters.endDate);
        customEnd.setHours(23, 59, 59, 999); // Include the entire end date
        return itemDate >= customStart && itemDate <= customEnd;
      }
      
      // Handle predefined ranges
      switch (filters.timeRange) {
        case 'Today':
          return itemDate >= startOfToday && itemDate < endOfToday;
        case 'Next 7 days':
          return itemDate >= startOfToday && itemDate <= next7Days;
        case 'Next 14 days':
          return itemDate >= startOfToday && itemDate <= next14Days;
        case 'Next 30 days':
          return itemDate >= startOfToday && itemDate <= next30Days;
        default:
          return true;
      }
    };

    const filterByTenant = (item: Task | Meeting | Coaching) => {
      if (!filters.tenant || filters.tenant === 'All Teams') return true;
      
      // Define team mappings based on common patterns in the data
      const teamMembers: { [key: string]: string[] } = {
        'Sales Team': ['Sarah Johnson', 'Mike Chen', 'Emily Davis'],
        'Technical Team': ['David Wilson', 'Tom Anderson'],
        'Support Team': ['Lisa Brown'],
        'Management': ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Wilson']
      };
      
      const selectedTeamMembers = teamMembers[filters.tenant] || [];
      
      // Check if the item's assignee/organizer belongs to the selected team
      const userField = (item as any).assignee || (item as any).organizer;
      return selectedTeamMembers.includes(userField);
    };

    const filterByUser = (item: Task | Meeting | Coaching) => {
      if (!filters.user || filters.user === 'All Users') return true;
      // Check various user-related fields
      return (
        (item as any).assignee === filters.user ||
        (item as any).organizer === filters.user ||
        (item as any).participant === filters.user
      );
     };

    const filteredTasks = tasks.filter(task => 
      filterByDate(task.dueDate) && filterByTenant(task) && filterByUser(task)
    );
    
    const filteredMeetings = meetings.filter(meeting => 
      filterByDate(meeting.dateTime) && filterByTenant(meeting) && filterByUser(meeting)
    );
    
    const filteredCoaching = coaching.filter(session => 
      filterByDate(session.dateTime) && filterByTenant(session) && filterByUser(session)
    );

    return {
      tasks: filteredTasks,
      meetings: filteredMeetings,
      coaching: filteredCoaching
    };
  }, [tasks, meetings, coaching, filters]);
};
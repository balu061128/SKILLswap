import type { User, Skill, Session, Feedback } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/101/100/100',
    bio: 'Full-stack developer with a passion for teaching and learning new technologies. Love hiking on weekends.',
    skillsToTeach: ['JavaScript', 'React', 'Node.js'],
    skillsToLearn: ['Python', 'Data Science'],
    interests: ['Hiking', 'Photography', 'Baking'],
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatarUrl: 'https://picsum.photos/seed/102/100/100',
    bio: 'Data scientist who enjoys mentoring others in Python and machine learning. Looking to improve my web development skills.',
    skillsToTeach: ['Python', 'Pandas', 'Scikit-learn'],
    skillsToLearn: ['React', 'CSS'],
    interests: ['Chess', 'Sci-fi movies', 'Cooking'],
  },
  {
    id: '3',
    name: 'Alex Ray',
    email: 'alex.ray@example.com',
    avatarUrl: 'https://picsum.photos/seed/103/100/100',
    bio: 'UX designer focused on creating intuitive user experiences. I can help with Figma and user research, and I want to learn how to code my designs.',
    skillsToTeach: ['UX Design', 'Figma', 'User Research'],
    skillsToLearn: ['HTML', 'JavaScript'],
    interests: ['Pottery', 'Indie music', 'Traveling'],
  },
  {
    id: '4',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatarUrl: 'https://picsum.photos/seed/104/100/100',
    bio: 'A chef by trade, I love sharing my passion for food. Interested in building a website for my recipes.',
    skillsToTeach: ['Italian Cooking', 'Baking Bread'],
    skillsToLearn: ['Web Development', 'Digital Marketing'],
    interests: ['Gardening', 'Yoga'],
  },
];

export const skills: Skill[] = [
  { id: '1', name: 'JavaScript', category: 'Programming', imageUrl: 'https://picsum.photos/seed/201/300/200' },
  { id: '2', name: 'React', category: 'Programming', imageUrl: 'https://picsum.photos/seed/205/300/200' },
  { id: '3', name: 'Python', category: 'Programming', imageUrl: 'https://picsum.photos/seed/202/300/200' },
  { id: '4', name: 'UX Design', category: 'Design', imageUrl: 'https://picsum.photos/seed/203/300/200' },
  { id: '5', name: 'Italian Cooking', category: 'Culinary', imageUrl: 'https://picsum.photos/seed/204/300/200' },
  { id: '6', name: 'Data Science', category: 'Programming', imageUrl: 'https://picsum.photos/seed/206/300/200' },
  { id: '7', name: 'Node.js', category: 'Programming', imageUrl: 'https://picsum.photos/seed/207/300/200' },
  { id: '8', name: 'Figma', category: 'Design', imageUrl: 'https://picsum.photos/seed/208/300/200' },
];

export const sessions: Session[] = [
  {
    id: '1',
    skillId: '1',
    teacherId: '1',
    learnerId: '3',
    scheduledTime: new Date('2024-08-15T14:00:00Z'),
    status: 'completed',
  },
  {
    id: '2',
    skillId: '3',
    teacherId: '2',
    learnerId: '1',
    scheduledTime: new Date('2024-08-16T10:00:00Z'),
    status: 'completed',
  },
  {
    id: '3',
    skillId: '4',
    teacherId: '3',
    learnerId: '2',
    scheduledTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'scheduled',
  },
];

export const feedbacks: Feedback[] = [
  {
    id: '1',
    sessionId: '1',
    fromUserId: '3',
    toUserId: '1',
    rating: 5,
    comment: 'Jane was an amazing teacher! She explained JavaScript concepts very clearly and was very patient.',
    createdAt: new Date('2024-08-15T15:05:00Z'),
  },
  {
    id: '2',
    sessionId: '2',
    fromUserId: '1',
    toUserId: '2',
    rating: 4,
    comment: 'John is very knowledgeable about Python. The session was great, though we ran out of time to cover everything.',
    createdAt: new Date('2024-08-16T11:10:00Z'),
  },
];

// Helper functions to get data
export const getUserById = (id: string) => users.find(u => u.id === id);
export const getSkillById = (id: string) => skills.find(s => s.id === id);
export const getFeedbackForUser = (userId: string) => feedbacks.filter(f => f.toUserId === userId);
export const getSessionsForUser = (userId: string) => sessions.filter(s => s.learnerId === userId || s.teacherId === userId);

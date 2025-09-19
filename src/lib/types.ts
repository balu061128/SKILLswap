export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  interests: string[];
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
};

export type Session = {
  id: string;
  skillId: string;
  teacherId: string;
  learnerId: string;
  scheduledTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
};

export type Feedback = {
  id: string;
  sessionId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

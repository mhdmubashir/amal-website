export interface Profile {
  name: string;
  designation: string;
  image: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface Department {
  name: string;
  image: string;
  color: string;
}

export interface FooterData {
  logo: string;
  address: string;
  quickLinks: string[];
  departments: string[];
  contact: string;
  location: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  youtubeVideo: string;
}

export interface CollegeData {
  collegeName: string;
  description: string;
  backgroundImage: string;
  announcements: string[];
  profiles: Profile[];
  highlights: Highlight[];
  departments: Department[];
  partners: string[];
  footer: FooterData;
}

export interface EventData {
  id?: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  imageUrl: string;
  location: string;
}

export interface StaffAchievement {
  id: string;
  title: string;
  staffName: string;
  designation: string;
  department: string;
  createdAt: string;

  description: string;
  imageUrl: string;
}

export interface StudentAchievement {
  id: string;
  title: string;
  description: string;
  createdAt: string;

  date: string;
  imageUrl: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageCount: number;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  search?: string;
}

export interface DepartmentData {
  id?: string;
  depName: string;
  description?: string;
  image?: string | File;
  imageUrl?: string;
  duration?: string;
  departmenthead?: any; // can be object or id
  contactnum?: string;
  syllabus?: string | File;
  syllabusUrl?: string;
}
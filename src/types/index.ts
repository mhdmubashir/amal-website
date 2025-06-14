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
  image: string;
  location: string;
}
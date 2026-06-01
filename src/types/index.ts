export interface Service {
  id: string;
  title: string;
  icon: string;
  summary: string;
  description: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  client: string;
  description: string;
  thumbnail: string;
}

export interface NavItem {
  label: string;
  path: string;
}

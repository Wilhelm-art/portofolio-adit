export interface Project {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
  liveUrl?: string;
  repoUrl?: string;
  screenshot: string;
}

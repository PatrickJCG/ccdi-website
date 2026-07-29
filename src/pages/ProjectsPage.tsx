import React from 'react';
import { NewsPage, type NewsPageProps } from './NewsPage';

export interface ProjectsPageProps extends NewsPageProps {}

/**
 * Projects page at /projects and /projects/:projectId according to ccdi.toon
 * Index View: [Navbar, ProjectsHeroSearch, FeaturedProject, CategoryTabs, ProjectsGrid, Footer]
 * Case Study View: [Navbar, ProjectHeader, BannerImage, KeyOutcomesCard, ProjectBody, ConsultationCTA, RelatedProjects, Footer]
 */
export const ProjectsPage: React.FC<ProjectsPageProps> = (props) => {
  return <NewsPage {...props} />;
};

import { type LinkProps } from '@tanstack/react-router';

export const siteConfigs = {
  name: 'Turbo Fullstack Starter',
};

type Route = {
  title: string;
} & LinkProps;

export const routes = [
  {
    activeOptions: {
      exact: true,
    },
    title: 'Home',
    to: '/',
  },
  {
    title: 'About',
    to: '/about',
  },
  {
    title: 'Posts',
    to: '/posts',
  },
] satisfies Route[];

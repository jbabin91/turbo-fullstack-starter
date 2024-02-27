import { type LinkProps } from '@tanstack/react-router';

type Route = {
  title: string;
} & LinkProps;

export const routes = [
  {
    activeOptions: {
      exact: true,
    },
    params: {},
    title: 'Home',
    to: '/',
  },
  {
    params: {},
    title: 'About',
    to: '/about',
  },
  {
    params: {},
    title: 'Posts',
    to: '/posts',
  },
] satisfies Route[];

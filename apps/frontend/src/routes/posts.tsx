import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

import { trpc } from '@/libs';

export const Route = createFileRoute('/posts')({
  component: PostsLayout,
});

function PostsLayout() {
  const { data } = trpc.posts.getAll.useQuery();

  return (
    <div className="flex flex-1">
      <div>
        <div className="border-b border-gray-900/10 p-4 px-3 py-2 dark:border-gray-200/20">
          <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl">
            Posts
          </h1>
        </div>
        <ul className="w-48 divide-y">
          {data?.map((post) => (
            <li key={post.id}>
              <Link
                activeProps={{ className: 'font-bold text-blue-400' }}
                className="block px-3 py-2 text-base font-semibold leading-7 hover:text-blue-500"
                params={{ postId: post.id }}
                to="/posts/$postId"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 border-l border-gray-900/10 p-4 dark:border-gray-200/20">
        <Outlet />
      </div>
    </div>
  );
}

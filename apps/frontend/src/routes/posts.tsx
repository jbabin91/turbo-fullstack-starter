import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

import { trpc } from '@/libs';

export const Route = createFileRoute('/posts')({
  component: PostsLayout,
});

function PostsLayout() {
  const { data } = trpc.posts.getAll.useQuery();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto ring-1 ring-white/10">
      <aside className="fixed inset-y-0 z-50 flex w-36 flex-col pt-16 sm:w-48 md:w-72">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/5 bg-black/10 px-6 pt-6">
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
            Posts
          </h1>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {data?.map((post) => (
                    <li key={post.id}>
                      <Link
                        activeProps={{
                          className: 'font-bold text-blue-400',
                        }}
                        className="group flex gap-x-3 rounded-md p-2 text-base font-semibold leading-6 dark:hover:text-blue-500"
                        params={{
                          postId: post.id,
                        }}
                        to="/posts/$postId"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="pl-36 sm:pl-48 md:pl-72">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

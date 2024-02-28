import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';

import { trpc } from '@/libs';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  const { data, isLoading } = trpc.posts.getAll.useQuery();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Hello /about!
        </h1>
      </div>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <div className="flex flex-col gap-4">
          {data?.map((post) => (
            <Card key={post.id} className="max-w-5xl">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <span>{post.createdAt.toISOString()}</span>
              </CardHeader>
              <CardContent>{post.content}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

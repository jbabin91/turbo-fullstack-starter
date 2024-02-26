import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';

import { trpc } from '../libs/trpc';

export const Route = createFileRoute('/about')({
  component: AboutComponent,
});

function AboutComponent() {
  const { data, isLoading } = trpc.posts.list.useQuery();
  return (
    <>
      <div>Hello /about!</div>
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
    </>
  );
}

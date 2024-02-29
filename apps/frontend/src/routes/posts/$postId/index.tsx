import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';

import { trpc } from '@/libs';

export const Route = createFileRoute('/posts/$postId/')({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const { data } = trpc.posts.getById.useQuery({ id: postId });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data?.title}</CardTitle>
        <span>{data?.createdAt.toISOString()}</span>
      </CardHeader>
      <CardContent>{data?.content}</CardContent>
    </Card>
  );
}

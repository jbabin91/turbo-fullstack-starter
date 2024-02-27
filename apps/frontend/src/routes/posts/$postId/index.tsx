import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { trpc } from '../../../libs/trpc';

export const Route = createFileRoute('/posts/$postId/')({
  component: PostComponent,
  parseParams: (params) => ({
    postId: z.number().int().parse(Number(params.postId)),
  }),
  stringifyParams: ({ postId }) => ({ postId: `${postId}` }),
});

function PostComponent() {
  const { postId } = Route.useParams();
  const { data } = trpc.posts.getById.useQuery({ id: Number(postId) });

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

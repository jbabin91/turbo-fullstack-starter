import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/')({
  component: PostsComponent,
});

function PostsComponent() {
  return <div>Please select a posts.</div>;
}

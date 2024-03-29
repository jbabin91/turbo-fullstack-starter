import { Button } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

import viteLogo from '/vite.svg';
import reactLogo from '@/assets/react.svg';
import { trpc } from '@/libs';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [count, setCount] = useState(0);
  const { data, isLoading } = trpc.example.useQuery();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Vite + React
      </h1>
      <div className="p-[2em]">
        <div className="flex flex-row justify-center gap-4">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </div>
        <p className="pt-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">
        Click on the Vite and React logos to learn more
      </p>
      <p>Message from api: {isLoading ? 'Loading....' : data?.message}</p>
    </div>
  );
}

import { useState } from "react";

import { Button } from "@/shared/components/ui/button";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-[40rem] w-[20rem] flex-col p-4">
      <h1>Linkshelf</h1>
      <Button onClick={() => setCount(count + 1)}>Click me!</Button>
      <p>Count: {count}</p>
    </div>
  );
}

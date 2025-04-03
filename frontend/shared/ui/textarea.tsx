import { cn } from "@frontend/shared/lib/utils";
import * as React from "react";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        `
          border-input bg-background ring-offset-background flex min-h-[80px]
          w-full rounded-md border px-3 py-2 text-base
          placeholder:text-muted-foreground
          focus-visible:ring-ring focus-visible:ring-2
          focus-visible:ring-offset-2 focus-visible:outline-none
          disabled:cursor-not-allowed disabled:opacity-50
          md:text-sm
        `,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };

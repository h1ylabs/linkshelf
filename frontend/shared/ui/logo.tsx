import { cn } from "@frontend/shared/lib/utils";

function Logo({
  alt = "Logo Of Linkshelf", className, width = 24, height = 24, ...props
}: Omit<React.ComponentProps<"img">, "src">) {
  return (
    <img
      src="/logo.svg"
      alt={alt}
      className={cn("dark:invert-100", className)}
      width={width}
      height={height}
      {...props}
    />
  );
}

export { Logo };

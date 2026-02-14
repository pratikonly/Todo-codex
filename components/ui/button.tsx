import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "icon";
};

export function Button({ className, variant = "default", size = "default", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition",
        variant === "default" && "bg-sky-500 text-white hover:bg-sky-600",
        variant === "ghost" && "hover:bg-white/10",
        variant === "outline" && "border border-white/20 bg-white/5 hover:bg-white/10",
        size === "default" && "h-10 px-4 text-sm",
        size === "sm" && "h-8 px-3 text-sm",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}

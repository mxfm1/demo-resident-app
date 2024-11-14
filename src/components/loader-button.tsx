import { Loader2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const loaderButtonVariants = cva(
    "flex gap-2 justify-center min-w-24 items-center", 
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
          custom: "bg-cyan-900 hover:bg-cyan-900/90"
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );

type LoaderButtonProps = {
    isLoading: boolean;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "custom";
    size?: "default" | "sm" | "lg" | "icon";
    loadingText?:string
}

export default function LoaderButton({
    isLoading,
    children,
    className,
    variant,
    size,
    loadingText
}:LoaderButtonProps){
    return (
        <Button
            className={cn(
                loaderButtonVariants({variant,size,className})
            )}
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? 
                <div className="flex justify-center space-x-2">
                    {loadingText}
                    <Loader2Icon className="animate-spin w-4 h-4" /> 
                </div>: children }
        </Button    >
    )
}
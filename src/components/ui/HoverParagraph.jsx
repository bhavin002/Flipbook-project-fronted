import { cn } from "@/lib/utils"
import React from "react"

const HoverParagraph = React.forwardRef(({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "relative flex w-full select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </p>
  ))
  
  HoverParagraph.displayName = "HoverParagraph"
  
  export default HoverParagraph
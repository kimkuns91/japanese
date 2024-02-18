import { cn } from "@/utils/style";
import { ComponentPropsWithoutRef, FC } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded-full px-10 py-4 font-semibold text-white transition-opacity",
        "hover:opacity-70",
        "button",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

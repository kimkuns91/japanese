import { cn } from "@/utils/style";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

interface LinkButtonProps extends ComponentPropsWithoutRef<"a"> {
  href: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  className,
  children,
  ...rest
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full px-10 py-4 font-semibold text-white transition-opacity",
        "hover:opacity-70",
        "button",
        className
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default LinkButton;

import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
}

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full", className)}>
      {children}
    </section>
  );
}

import { BrainCircuit } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

export function Logo({ className, iconSize = 8, textSize = "xl" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Insight Forge Logo">
      <BrainCircuit className={`h-${iconSize} w-${iconSize} text-primary`} />
      <span className={`text-${textSize} font-semibold text-foreground`}>
        Insight Forge
      </span>
    </div>
  );
}

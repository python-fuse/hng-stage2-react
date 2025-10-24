interface DecorativeCircleProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  opacity?: number;
  className?: string;
}

export default function DecorativeCircle({
  size = "md",
  color = "bg-blue-500",
  opacity = 0.1,
  className = "",
}: DecorativeCircleProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${color} 
        rounded-full 
        absolute 
        blur-sm
        ${className}
      `}
      style={{ opacity }}
    />
  );
}

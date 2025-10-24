interface WaveBackgroundProps {
  className?: string;
  color?: string;
}

export default function WaveBackground({
  className = "",
  color = "#3B82F6",
}: WaveBackgroundProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}
    >
      <svg
        className="relative block w-full h-20"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,96L40,85.3C80,75,160,53,240,48C320,43,400,53,480,64C560,75,640,85,720,80C800,75,880,53,960,48C1040,43,1120,53,1160,58.7L1200,64L1200,120L1160,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

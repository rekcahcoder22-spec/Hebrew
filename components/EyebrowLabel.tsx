type Props = {
  children: React.ReactNode;
  className?: string;
};

export function EyebrowLabel({ children, className = "" }: Props) {
  return (
    <p
      className={`font-body text-[9px] font-light uppercase tracking-[0.45em] text-[#8B1A1A] ${className}`}
    >
      {children}
    </p>
  );
}

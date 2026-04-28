type Props = {
  children: React.ReactNode;
  className?: string;
};

export function SeamGrid({ children, className = "" }: Props) {
  return (
    <div className={`grid gap-px bg-[#161616] ${className}`}>
      {children}
    </div>
  );
}

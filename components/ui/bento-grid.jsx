import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between rounded-[24px] border border-white/[0.08] bg-[#0a0a14] transition duration-300 hover:shadow-xl hover:border-indigo-500/30",
        className
      )}
      style={{ padding: '40px' }}
    >
      <div className="flex flex-col gap-4 mb-6 transition duration-300 group-hover/bento:-translate-y-1">
        {icon}
        <div className="font-sans font-bold text-zinc-100 text-xl tracking-wide">
          {title}
        </div>
        <div className="font-sans text-[1rem] font-normal text-zinc-400 leading-relaxed">
          {description}
        </div>
      </div>
      <div className="w-full rounded-xl overflow-hidden bg-[#060610] border border-white/[0.04]">
        {header}
      </div>
    </div>
  );
};

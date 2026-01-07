export function SkeletonCard() {
  return (
    <div className="relative p-[1px] rounded-xl bg-gradient-to-br from-white/20 to-transparent animate-pulse">
      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-white/5 rounded w-1/2"></div>
            </div>
          </div>
          <div className="text-right">
            <div className="h-5 bg-white/10 rounded w-20 mb-1"></div>
            <div className="h-3 bg-white/5 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="space-y-2">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}


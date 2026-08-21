export function ProductSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="shimmer aspect-[3/4] w-full rounded-[18px]" />
      <div className="px-0.5 pt-3">
        <div className="shimmer h-3 w-1/2 rounded-full" />
        <div className="shimmer mt-2 h-2.5 w-4/5 rounded-full" />
        <div className="shimmer mt-1.5 h-2.5 w-3/5 rounded-full" />
        <div className="shimmer mt-2.5 h-3.5 w-2/3 rounded-full" />
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

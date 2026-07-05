function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="h-52 bg-gray-200"></div>

      <div className="p-5">
        <div className="h-6 w-24 rounded bg-gray-200 mb-4"></div>

        <div className="h-8 w-3/4 rounded bg-gray-200 mb-4"></div>

        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 rounded bg-gray-200"></div>
          <div className="h-4 w-2/3 rounded bg-gray-200"></div>
        </div>

        <div className="mt-6 h-4 w-28 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}

export default CardSkeleton;

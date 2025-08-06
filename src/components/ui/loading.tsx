// src/components/ui/loading.tsx
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-6 h-6 border-2 border-wedding-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export function WishSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-start gap-3 p-6 bg-white border border-gray-100 rounded-lg">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="h-2 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  )
}
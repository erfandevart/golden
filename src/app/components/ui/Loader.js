/**
 * کامپوننت Loader برای نمایش حالت بارگذاری
 */
export function Loader({ size = "md" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin`}
      ></div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader size="lg" />
        <div className="text-xl text-white font-YekanBakhSemiBold">
          در حال بارگذاری...
        </div>
      </div>
    </div>
  );
}


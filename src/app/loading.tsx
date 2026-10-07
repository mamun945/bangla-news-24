
const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-[#C2F800]"></div>

        {/* Loading Text */}
        <p className="text-sm font-medium tracking-widest text-gray-400">
          LOADING...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;

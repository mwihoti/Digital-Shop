export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
      <a
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}
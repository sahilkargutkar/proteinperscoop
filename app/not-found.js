import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | Protein Per Scoop',
  description: 'The page you are looking for could not be found. Browse our protein supplement deals and find the best offers.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="max-w-md mx-auto">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5l-6.928-12c-.77-.833-1.734-.833-2.504 0l-6.928 12c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>

          {/* 404 Content */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Oops! The page you&apos;re looking for doesn&apos;t exist. 
            But don&apos;t worry, we have plenty of amazing protein deals waiting for you!
          </p>

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Browse All Deals
            </Link>
            <Link 
              href="/category/whey-protein"
              className="inline-block border border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              Popular Deals
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link href="/category/whey-protein" className="text-red-600 hover:text-red-800 transition-colors">
                Whey Protein
              </Link>
              <Link href="/category/creatine" className="text-red-600 hover:text-red-800 transition-colors">
                Creatine
              </Link>
              <Link href="/category/pre-workout" className="text-red-600 hover:text-red-800 transition-colors">
                Pre-Workout
              </Link>
              <Link href="/category/protein-bars" className="text-red-600 hover:text-red-800 transition-colors">
                Protein Bars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

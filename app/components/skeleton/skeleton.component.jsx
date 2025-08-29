import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="rounded-2xl overflow-hidden shadow-xl flex flex-col bg-white animate-pulse" style={{ minHeight: '420px' }}>
            {/* Image Skeleton */}
            <div className="h-56 bg-gray-300 relative">
                <div className="absolute top-4 right-4 w-20 h-6 bg-gray-400 rounded-full"></div>
                <div className="absolute top-4 left-4 w-16 h-6 bg-gray-400 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-20 h-12 bg-gray-400 rounded-xl"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="px-6 py-5 flex-grow flex flex-col">
                {/* Brand */}
                <div className="w-20 h-4 bg-gray-300 rounded-full mb-3"></div>
                
                {/* Title */}
                <div className="space-y-2 mb-3">
                    <div className="w-full h-5 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                </div>
                
                {/* Description */}
                <div className="space-y-2 mb-4 flex-grow">
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                </div>
                
                {/* Rating */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-gray-300 rounded"></div>
                        ))}
                    </div>
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
            
            {/* Footer Skeleton */}
            <div className="px-6 py-4 bg-gray-800">
                <div className="flex justify-between items-center">
                    <div className="space-y-1">
                        <div className="w-12 h-3 bg-gray-600 rounded"></div>
                        <div className="w-16 h-4 bg-gray-500 rounded"></div>
                    </div>
                    <div className="w-24 h-10 bg-gray-600 rounded-xl"></div>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between mb-1">
                        <div className="w-20 h-3 bg-gray-600 rounded"></div>
                        <div className="w-8 h-3 bg-gray-600 rounded"></div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="w-4/5 h-1.5 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkeletonGrid = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(count)].map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};

export { SkeletonCard, SkeletonGrid };

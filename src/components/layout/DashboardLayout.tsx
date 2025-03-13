'use client';

import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface GlobalString {
  key: string;
  value: string;
}

interface ApiResponse {
  globalStrings: GlobalString[];
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data, isLoading, isError, refetch } = useQuery<ApiResponse>({
    queryKey: ['sheets'],
    queryFn: async () => {
      const response = await fetch('/api/sheets', {
        // Prevent browser caching
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    // Refetch every 10 seconds (more frequent for testing)
    refetchInterval: 10000,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
    // Refetch when internet connection is restored
    refetchOnReconnect: true,
    // Don't show stale data while refetching
    staleTime: 0,
  });

  const getGlobalString = (key: string): string => {
    if (!data?.globalStrings) return '';
    const globalString = data.globalStrings.find(str => str.key.trim() === key.trim());
    return globalString?.value || '';
  };

  const title = getGlobalString('GlobalTitle') || 'Global Retail Media Dashboard';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {isLoading ? (
                <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
              ) : isError ? (
                'Global Retail Media Dashboard'
              ) : (
                title
              )}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {isLoading ? 'Refreshing...' : 'Last updated: ' + new Date().toLocaleTimeString()}
            </span>
            <button 
              onClick={() => refetch()}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {isLoading ? (
              <>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </>
            ) : isError ? (
              <>
                <p className="text-sm text-gray-500">All data is proprietary. Do not redistribute</p>
                <p className="text-sm text-gray-400">© 2025 My Company. All Rights Reserved.</p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  {getGlobalString('GlobalDisclaimer')}
                </p>
                <p className="text-sm text-gray-400">
                  {getGlobalString('GlobalFooter')}
                </p>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
} 
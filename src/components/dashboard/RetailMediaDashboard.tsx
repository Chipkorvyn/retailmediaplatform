/**
 * File: src/components/dashboard/RetailMediaDashboard.tsx
 * Main dashboard component for the retail media platform
 * Last updated: Fixed global strings handling
 */

"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { TabComponents } from '@/components/tabs';
import { GlobalString, Slide, DynamicSection, DynamicSectionData } from '@/types/dashboard';

interface GlobalsResponse {
  globalStrings: GlobalString[];
}

interface Tab {
  tabId: string;
  tabName: string;
  tabTitle: string;
  tabSubtitle: string;
  sortOrder: number;
  isActive: boolean;
}

interface TabsResponse {
  tabs: Tab[];
}

interface SlidesResponse {
  slides: Slide[];
}

interface DynamicSectionsResponse {
  sections: DynamicSection[];
}

interface DynamicSectionDataResponse {
  sectionData: DynamicSectionData[];
}

const RetailMediaDashboard = () => {
  // Fetch global strings from the API
  const { data: globalStringsData, isLoading: isLoadingGlobal, error: globalError } = useQuery<GlobalsResponse>({
    queryKey: ['globalStrings'],
    queryFn: async () => {
      console.log('Fetching global strings...');
      const response = await fetch('/api/sheets?type=globals&t=' + Date.now(), {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch global strings');
      }
      const data = await response.json();
      console.log('Received global strings data:', JSON.stringify(data, null, 2));
      return data;
    },
    refetchInterval: 5000, // Reduced to 5 seconds for more frequent updates
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0,
    gcTime: 0
  });

  // Fetch tabs data
  const { data: tabsData, isLoading: isLoadingTabs, error: tabsError } = useQuery<TabsResponse>({
    queryKey: ['tabsData'],
    queryFn: async () => {
      console.log('Fetching tabs data...');
      const response = await fetch('/api/sheets?type=tabs', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tabs data');
      }
      const data = await response.json();
      console.log('Received tabs data:', data);
      return data;
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  // Fetch slides data
  const { data: slidesData, isLoading: isLoadingSlides, error: slidesError } = useQuery<SlidesResponse>({
    queryKey: ['slidesData'],
    queryFn: async () => {
      console.log('Fetching slides data...');
      const response = await fetch('/api/sheets?type=slides', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch slides data');
      }
      const data = await response.json();
      console.log('Received slides data:', data);
      return data;
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  // Fetch sections data
  const { data: sectionsData, isLoading: isLoadingSections, error: sectionsError } = useQuery<DynamicSectionsResponse>({
    queryKey: ['sections'],
    queryFn: async () => {
      console.log('Fetching sections data...');
      const response = await fetch('/api/sheets?type=sections', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch sections data');
      }
      const data = await response.json();
      console.log('Received sections data:', JSON.stringify(data, null, 2));
      return data;
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  // Fetch section data
  const { data: sectionData, isLoading: isLoadingSectionData, error: sectionDataError } = useQuery<DynamicSectionDataResponse>({
    queryKey: ['sectionData'],
    queryFn: async () => {
      console.log('Fetching section data...');
      const response = await fetch('/api/sheets?type=sectionData', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch section data');
      }
      const data = await response.json();
      console.log('Received section data:', JSON.stringify(data, null, 2));
      return data;
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  // Loading state
  if (isLoadingGlobal || isLoadingTabs || isLoadingSlides || isLoadingSections || isLoadingSectionData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Error state
  const error = globalError || tabsError || slidesError || sectionsError || sectionDataError;
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading data: {error.message}</p>
          <p className="text-sm text-gray-600">Please check the browser console for more details.</p>
        </div>
      </div>
    );
  }

  // Sort tabs by sortOrder
  const sortedTabs = tabsData?.tabs
    .filter(tab => tab.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder) || [];

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">
            {globalStringsData?.globalStrings?.find(str => str.key === 'GlobalTitle')?.value || 'Global Retail Media Insights 2025'}
          </h2>
          <p className="text-xl text-gray-500">
            {globalStringsData?.globalStrings?.find(str => str.key === 'GlobalSubtitle')?.value || 'March 2025'}
          </p>
        </div>
      </div>

      <Tabs defaultValue={sortedTabs[0]?.tabId} className="space-y-4">
        <TabsList>
          {sortedTabs.map(tab => (
            <TabsTrigger key={tab.tabId} value={tab.tabId}>
              {tab.tabName}
            </TabsTrigger>
          ))}
        </TabsList>

        {sortedTabs.map(tab => {
          const TabComponent = TabComponents[tab.tabId];
          const tabSlides = slidesData?.slides.filter(s => s.tabId === tab.tabId) || [];
          const tabSections = sectionsData?.sections.filter(s => 
            tabSlides.some(slide => slide.slideId === s.slideId)
          ) || [];
          const tabSectionData = sectionData?.sectionData.filter(sd => 
            tabSections.some(section => section.sectionId === sd.sectionId)
          ) || [];

          return (
            <TabsContent key={tab.tabId} value={tab.tabId}>
              {TabComponent ? (
                <TabComponent
                  slides={tabSlides}
                  sections={tabSections}
                  sectionData={tabSectionData}
                  globalStrings={globalStringsData?.globalStrings || []}
                />
              ) : (
                <div className="text-center p-4">
                  <p className="text-gray-500">Missing tab component for {tab.tabId}</p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <div className="mt-8 border-t pt-8">
        <div className="text-sm text-gray-500">
          <p className="mb-2">
            {globalStringsData?.globalStrings?.find(str => str.key === 'GlobalDisclaimer')?.value || 'All data is proprietary. Do not redistribute'}
          </p>
          <p>
            {globalStringsData?.globalStrings?.find(str => str.key === 'GlobalFooter')?.value || '© 2025 My Company. All Rights Reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RetailMediaDashboard; 
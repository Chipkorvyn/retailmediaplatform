/**
 * File: src/components/dashboard/RetailMediaDashboard.tsx
 * Main dashboard component for the retail media platform
 * Last updated: Added Google Sheets integration for Country Potential tab
 */

"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Pie, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';
import { Loader2 } from 'lucide-react';

// Types for the API response
interface GlobalString {
  key: string;
  value: string;
}

interface ApiResponse {
  globalStrings: GlobalString[];
  marketData?: MarketTabData; // Add this if the API returns both in one response
}

interface MarketSection {
  tabName: string;
  sectionName: string;
  sectionId: string;
  chartType: string;
  description: string;
  sortOrder: number;
}

interface MarketTabData {
  sections: MarketSection[];
  sectionData: {
    sectionId: string;
    label: string;
    value: number;
  }[];
}

interface ChartDataPoint {
  name: string;
  value: number;
}

// Mock data for other tabs
const retailerPerformanceData = [
  { name: 'Amazon', rmPercent: 4.2 },
  { name: 'Walmart', rmPercent: 2.8 },
  { name: 'Target', rmPercent: 1.9 },
  { name: 'Kroger', rmPercent: 1.5 },
  { name: 'Best Buy', rmPercent: 1.2 },
];

const categorySpendData = [
  { name: 'CPG', percent: 35 },
  { name: 'Electronics', percent: 22 },
  { name: 'Apparel', percent: 15 },
  { name: 'Beauty', percent: 18 },
  { name: 'Other', percent: 10 },
];

const channelSplitData = [
  { name: 'On-Site Search', value: 42 },
  { name: 'Display Ads', value: 28 },
  { name: 'In-Store Digital', value: 18 },
  { name: 'Off-Site', value: 12 },
];

const channelGrowthData = [
  { year: '2019', onsite: 12, offsite: 4, instore: 2 },
  { year: '2020', onsite: 18, offsite: 6, instore: 3 },
  { year: '2021', onsite: 25, offsite: 9, instore: 5 },
  { year: '2022', onsite: 35, offsite: 14, instore: 8 },
  { year: '2023', onsite: 42, offsite: 18, instore: 12 },
];

const retailerComparisonData = [
  { name: 'Walmart', totalSales: 572.0, rmRevenue: 16.0, rmPercent: 2.8, rmProfit: 13.2 },
  { name: 'Target', totalSales: 108.7, rmRevenue: 2.1, rmPercent: 1.9, rmProfit: 1.7 },
  { name: 'Kroger', totalSales: 148.3, rmRevenue: 2.2, rmPercent: 1.5, rmProfit: 1.8 },
  { name: 'Amazon', totalSales: 386.1, rmRevenue: 16.2, rmPercent: 4.2, rmProfit: 13.6 },
];

const RetailMediaDashboard = () => {
  const [selectedChart, setSelectedChart] = React.useState('revenue');

  // Fetch global strings from the API
  const { data: globalStringsData, isLoading: isLoadingGlobal, error: globalError } = useQuery<ApiResponse>({
    queryKey: ['globalStrings'],
    queryFn: async () => {
      console.log('Fetching global strings...');
      const response = await fetch('/api/sheets?type=globals', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Received global strings data:', data);
      return data;
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  // Fetch data from the API
  const { data: marketData, isLoading: isLoadingMarket, error: marketError } = useQuery<MarketTabData>({
    queryKey: ['marketData'],
    queryFn: async () => {
      console.log('Fetching market data...');
      const response = await fetch('/api/sheets?type=market', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to fetch market data');
      }
      const data = await response.json();
      console.log('Received market data:', data);
      return data;
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 0
  });

  const getGlobalString = (key: string): string => {
    console.log('Getting global string for key:', key);
    console.log('Current globalStringsData:', globalStringsData);
    
    if (!globalStringsData) {
      console.log('No globalStringsData available');
      return 'Loading...';
    }

    if (!globalStringsData.globalStrings) {
      console.warn('API response missing globalStrings array:', globalStringsData);
      return 'Loading...';
    }

    const globalString = globalStringsData.globalStrings.find(str => str.key.trim() === key.trim());
    console.log('Found global string:', globalString);
    
    if (!globalString) {
      console.warn('No matching global string found for key:', key);
      return 'Loading...';
    }

    console.log('Returning value:', globalString.value);
    return globalString.value;
  };

  // Loading state
  if (isLoadingMarket || isLoadingGlobal) {
    console.log('Loading state - Global:', isLoadingGlobal, 'Market:', isLoadingMarket);
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Error state
  if (globalError || marketError) {
    console.error('Global error:', globalError);
    console.error('Market error:', marketError);
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading data: {((globalError || marketError) as Error)?.message}</p>
          <p className="text-sm text-gray-600">Please check the browser console for more details.</p>
        </div>
      </div>
    );
  }

  const title = getGlobalString('GlobalTitle');
  console.log('Final title to display:', title);

  // Early return if market data is not available
  if (!marketData?.sections) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading market data...</p>
        </div>
      </div>
    );
  }

  const getChartData = (sectionId: string): ChartDataPoint[] => {
    if (!marketData) return [];
    const filteredData = marketData.sectionData
      .filter((data) => data.sectionId === sectionId)
      .map((data) => ({
        name: data.label,
        value: data.value,
      }));
    console.log(`Chart data for section ${sectionId}:`, filteredData);
    return filteredData;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">
            {getGlobalString('GlobalTitle')}
          </h2>
          <p className="text-xl text-gray-500">
            {getGlobalString('GlobalSubtitle')}
          </p>
        </div>
      </div>
      <Tabs defaultValue="country-potential" className="space-y-4">
        <TabsList>
          <TabsTrigger value="welcome">Welcome</TabsTrigger>
          <TabsTrigger value="country-potential">Country Potential</TabsTrigger>
          <TabsTrigger value="best-in-class">Best in Class</TabsTrigger>
          <TabsTrigger value="advertiser-categories">
            Advertiser Categories
          </TabsTrigger>
          <TabsTrigger value="channel-breakdown">Channel Breakdown</TabsTrigger>
          <TabsTrigger value="retailer-deep-dives">
            Retailer Deep Dives
          </TabsTrigger>
        </TabsList>

        {/* Welcome Page */}
        <TabsContent value="welcome">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Retail Media 2025: Market Overview & Retailer Benchmarks</CardTitle>
              <CardDescription className="text-muted-foreground">US Focus | Comprehensive Market Analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted/50 p-6">
                <h3 className="font-semibold mb-3">Data Sources & Coverage:</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Retailer financial reports (2019-2023)</li>
                  <li>Industry benchmark studies</li>
                  <li>Expert interviews with retail media executives</li>
                  <li>Advertiser spend analysis across 20+ retailers</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
                <p className="text-yellow-800 font-medium">MOCK DATA: Do not publish or distribute. For internal use only.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Dashboard Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Market size & growth trajectory</li>
                      <li>Best-in-class retailer benchmarks</li>
                      <li>Advertiser category investment analysis</li>
                      <li>Channel performance breakdown</li>
                      <li>Retailer comparisons & deep dives</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Questions Addressed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>What is the overall retail media revenue and profit potential?</li>
                      <li>Which advertiser categories invest most, and why?</li>
                      <li>What is the revenue & profit potential by channel/format?</li>
                      <li>How do top retailers compare in performance?</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <p className="text-center text-muted-foreground">Navigate through the tabs above to explore the dashboard</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Potential Page */}
        <TabsContent value="country-potential" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Country Potential Analysis</CardTitle>
                <CardDescription>Select a metric to view different aspects of retail media potential by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(marketData?.sections || []).map((section) => (
                    <button
                      key={section.sectionId}
                      onClick={() => setSelectedChart(section.sectionId)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedChart === section.sectionId
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {section.sectionName}
                    </button>
                  ))}
                </div>

                {(marketData?.sections || []).map((section) => (
                  selectedChart === section.sectionId && (
                    <div key={section.sectionId}>
                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart
                          data={getChartData(section.sectionId)}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={70}
                          />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar
                            dataKey="value"
                            fill="#8884d8"
                            name="Value"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Best in Class Retailer Performance */}
        <TabsContent value="best-in-class">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Best-in-Class Retailer Performance</CardTitle>
                <CardDescription>RM Revenue as % of Total Retail Sales</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={retailerPerformanceData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 50, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 5]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="rmPercent" fill="#8884d8" name="RM % of Retail Sales" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-6 p-3 bg-blue-50 rounded-lg text-sm">
                  <p><span className="font-semibold">Best Performer:</span> Amazon leads with 4.2% of retail sales coming from media, generating 84% profit margins on their retail media business.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Revenue & Profitability Analysis</CardTitle>
                <CardDescription>Key Performance Metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="bg-blue-50 p-4">
                    <h3 className="text-sm font-semibold mb-2">Top Performer</h3>
                    <p className="text-2xl font-bold">Amazon</p>
                    <p className="text-sm text-gray-600">4.2% RM/Sales Ratio</p>
                    <p className="text-sm text-gray-600">84% Profit Margin</p>
                  </Card>
                  <Card className="bg-green-50 p-4">
                    <h3 className="text-sm font-semibold mb-2">Fast Riser</h3>
                    <p className="text-2xl font-bold">Walmart</p>
                    <p className="text-sm text-gray-600">2.8% RM/Sales Ratio</p>
                    <p className="text-sm text-gray-600">78% Profit Margin</p>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Success Factors</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Strong first-party data capabilities</li>
                      <li>Advanced targeting and measurement</li>
                      <li>Integrated omnichannel approach</li>
                      <li>Robust self-service platforms</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Growth Opportunities</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Expansion into off-site media</li>
                      <li>Enhanced measurement solutions</li>
                      <li>Cross-retailer partnerships</li>
                      <li>Innovation in ad formats</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advertiser Categories Page */}
        <TabsContent value="advertiser-categories">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Advertiser Category Investment</CardTitle>
                <CardDescription>Category Spending & Motivation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={categorySpendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 40]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percent" fill="#8884d8" name="% of Total RM Spend" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-6 grid grid-cols-1 gap-3 text-sm">
                  <div className="p-2 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p><span className="font-semibold">CPG (35%):</span> Shelf placement visibility, in-store brand building, and competitive blocking.</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p><span className="font-semibold">Electronics (22%):</span> New product launches, dynamic deal promotions, and high-margin items.</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <p><span className="font-semibold">Apparel (15%):</span> Seasonal promotions, category dominance, and omnichannel conversion.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Category Mix Comparison</CardTitle>
                <CardDescription>Online vs. In-Store Spend Distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-center font-medium mb-2">Online</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={categorySpendData}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="percent"
                          nameKey="name"
                          label
                        >
                          {categorySpendData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h3 className="text-center font-medium mb-2">In-Store</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'CPG', percent: 45 },
                            { name: 'Electronics', percent: 18 },
                            { name: 'Apparel', percent: 12 },
                            { name: 'Beauty', percent: 15 },
                            { name: 'Other', percent: 10 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="percent"
                          nameKey="name"
                          label
                        >
                          {categorySpendData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm">
                  <p><span className="font-semibold">Key Insight:</span> CPG dominates in-store retail media at 45% share vs. 35% online, driven by in-store impulse purchasing and physical shopping behavior.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Channel Breakdown Page */}
        <TabsContent value="channel-breakdown">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Channel Distribution</CardTitle>
                <CardDescription>Current Year Split</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelSplitData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {channelSplitData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <p><span className="font-semibold">Channel Distribution:</span> On-Site Search dominates with 42% of spend, but In-Store Digital is the fastest-growing channel.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-white">
              <CardHeader>
                <CardTitle>Channel Growth Trajectory</CardTitle>
                <CardDescription>2019-2023 Revenue by Channel (USD Billions)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={channelGrowthData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="onsite" name="On-Site" stroke="#8884d8" />
                    <Line type="monotone" dataKey="offsite" name="Off-Site" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="instore" name="In-Store" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <Card className="bg-blue-50 p-3 text-center">
                    <p className="text-xs text-gray-500">Best-in-Class</p>
                    <p className="text-sm font-bold">On-Site</p>
                    <p className="text-lg font-bold">Amazon</p>
                    <p className="text-xs text-blue-700">85% Profit Margin</p>
                  </Card>
                  <Card className="bg-green-50 p-3 text-center">
                    <p className="text-xs text-gray-500">Best-in-Class</p>
                    <p className="text-sm font-bold">Off-Site</p>
                    <p className="text-lg font-bold">Walmart</p>
                    <p className="text-xs text-green-700">72% Profit Margin</p>
                  </Card>
                  <Card className="bg-yellow-50 p-3 text-center">
                    <p className="text-xs text-gray-500">Best-in-Class</p>
                    <p className="text-sm font-bold">In-Store</p>
                    <p className="text-lg font-bold">Target</p>
                    <p className="text-xs text-yellow-700">68% Profit Margin</p>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Retailer Deep Dives Page */}
        <TabsContent value="retailer-deep-dives">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Retailer Deep Dive</CardTitle>
                <CardDescription>Select a retailer to view performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-6">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Walmart</button>
                  <button className="px-4 py-2 bg-gray-200 rounded-lg">Target</button>
                  <button className="px-4 py-2 bg-gray-200 rounded-lg">Kroger</button>
                  <button className="px-4 py-2 bg-gray-200 rounded-lg">Amazon</button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Card className="bg-blue-50 p-4 text-center">
                        <p className="text-xs text-gray-500">Total Retail Revenue</p>
                        <p className="text-xl font-bold">$572B</p>
                      </Card>
                      <Card className="bg-green-50 p-4 text-center">
                        <p className="text-xs text-gray-500">Total RM Revenue</p>
                        <p className="text-xl font-bold">$16.0B</p>
                      </Card>
                      <Card className="bg-purple-50 p-4 text-center">
                        <p className="text-xs text-gray-500">RM % of Retail Sales</p>
                        <p className="text-xl font-bold">2.8%</p>
                      </Card>
                      <Card className="bg-yellow-50 p-4 text-center">
                        <p className="text-xs text-gray-500">Total RM Profit</p>
                        <p className="text-xl font-bold">$13.2B</p>
                      </Card>
                    </div>
                    
                    <Card className="mb-6">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Channel Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={180}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'On-Site', value: 62 },
                                { name: 'Off-Site', value: 22 },
                                { name: 'In-Store', value: 16 }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              <Cell fill="#0088FE" />
                              <Cell fill="#00C49F" />
                              <Cell fill="#FFBB28" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Multi-Retailer Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white">
                            <thead>
                              <tr>
                                <th className="py-2 px-4 border-b text-left">Retailer</th>
                                <th className="py-2 px-4 border-b text-right">Total Sales ($B)</th>
                                <th className="py-2 px-4 border-b text-right">RM Revenue ($B)</th>
                                <th className="py-2 px-4 border-b text-right">RM % of Sales</th>
                                <th className="py-2 px-4 border-b text-right">RM Profit ($B)</th>
                                <th className="py-2 px-4 border-b text-right">Profit Margin</th>
                              </tr>
                            </thead>
                            <tbody>
                              {retailerComparisonData.map((retailer) => (
                                <tr key={retailer.name} className={retailer.name === 'Walmart' ? 'bg-blue-50' : ''}>
                                  <td className="py-2 px-4 border-b font-medium">{retailer.name}</td>
                                  <td className="py-2 px-4 border-b text-right">${retailer.totalSales.toFixed(1)}</td>
                                  <td className="py-2 px-4 border-b text-right">${retailer.rmRevenue.toFixed(1)}</td>
                                  <td className="py-2 px-4 border-b text-right">{retailer.rmPercent.toFixed(1)}%</td>
                                  <td className="py-2 px-4 border-b text-right">${retailer.rmProfit.toFixed(1)}</td>
                                  <td className="py-2 px-4 border-b text-right">{((retailer.rmProfit/retailer.rmRevenue)*100).toFixed(1)}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="mt-6 p-3 bg-gray-50 rounded-lg text-sm">
                          <p><span className="font-semibold">Walmart Performance:</span> Leads in absolute retail media revenue, with on-site search accounting for 62% of total retail media revenue.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-8 border-t pt-8">
        <div className="text-sm text-gray-500">
          <p className="mb-2">{getGlobalString('GlobalDisclaimer')}</p>
          <p>{getGlobalString('GlobalFooter')}</p>
        </div>
      </div>
    </div>
  );
};

export default RetailMediaDashboard; 
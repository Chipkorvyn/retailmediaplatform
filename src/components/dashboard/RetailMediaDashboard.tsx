/**
 * File: src/components/dashboard/RetailMediaDashboard.tsx
 * Main dashboard component for the retail media platform
 * Last updated: Vercel deployment fix
 */

"use client"

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Pie, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

const RetailMediaDashboard = () => {
  // Mock data for visualizations
  const countryRevenueData = [
    { country: 'United States', revenue: 45.2 },
    { country: 'China', revenue: 32.4 },
    { country: 'United Kingdom', revenue: 8.6 },
    { country: 'Germany', revenue: 7.2 },
    { country: 'France', revenue: 5.8 },
    { country: 'Japan', revenue: 4.9 },
    { country: 'Australia', revenue: 3.2 },
    { country: 'South Korea', revenue: 2.8 }
  ];

  const countryGrowthData = [
    { country: 'United States', growth: 28 },
    { country: 'China', growth: 42 },
    { country: 'United Kingdom', growth: 32 },
    { country: 'Germany', growth: 30 },
    { country: 'France', growth: 29 },
    { country: 'Japan', growth: 25 },
    { country: 'Australia', growth: 35 },
    { country: 'South Korea', growth: 38 }
  ];

  const countryRetailShareData = [
    { country: 'United States', share: 3.2 },
    { country: 'China', share: 2.8 },
    { country: 'United Kingdom', share: 2.4 },
    { country: 'Germany', share: 2.1 },
    { country: 'France', share: 1.9 },
    { country: 'Japan', share: 1.8 },
    { country: 'Australia', share: 1.6 },
    { country: 'South Korea', share: 1.5 }
  ];

  const countryAdShareData = [
    { country: 'United States', share: 12.5 },
    { country: 'China', share: 10.8 },
    { country: 'United Kingdom', share: 9.6 },
    { country: 'Germany', share: 8.4 },
    { country: 'France', share: 7.8 },
    { country: 'Japan', share: 7.2 },
    { country: 'Australia', share: 6.8 },
    { country: 'South Korea', share: 6.4 }
  ];

  const retailerPerformanceData = [
    { name: 'Amazon', rmPercent: 4.2, absoluteRevenue: 45, profit: 38 },
    { name: 'Walmart', rmPercent: 2.8, absoluteRevenue: 32, profit: 26 },
    { name: 'Target', rmPercent: 2.1, absoluteRevenue: 18, profit: 14 },
    { name: 'Kroger', rmPercent: 1.9, absoluteRevenue: 12, profit: 9 },
    { name: 'CVS', rmPercent: 1.7, absoluteRevenue: 8, profit: 6 },
    { name: 'Home Depot', rmPercent: 1.4, absoluteRevenue: 7, profit: 5 },
  ];

  const categorySpendData = [
    { name: 'CPG', percent: 35, growth: 32 },
    { name: 'Electronics', percent: 22, growth: 28 },
    { name: 'Apparel', percent: 15, growth: 18 },
    { name: 'Beauty', percent: 10, growth: 22 },
    { name: 'Home Goods', percent: 8, growth: 15 },
    { name: 'Toys', percent: 6, growth: 10 },
    { name: 'Other', percent: 4, growth: 8 },
  ];

  const channelSplitData = [
    { name: 'On-Site Search', value: 42 },
    { name: 'On-Site Display', value: 28 },
    { name: 'Off-Site Media', value: 18 },
    { name: 'In-Store Digital', value: 12 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const channelGrowthData = [
    { year: 2019, onsite: 8.1, offsite: 2.5, instore: 1.8 },
    { year: 2020, onsite: 12.2, offsite: 3.8, instore: 2.6 },
    { year: 2021, onsite: 18.5, offsite: 5.7, instore: 3.3 },
    { year: 2022, onsite: 23.6, offsite: 7.4, instore: 4.8 },
    { year: 2023, onsite: 29.8, offsite: 9.2, instore: 6.2 },
  ];

  const retailerComparisonData = [
    { 
      name: 'Walmart', 
      totalSales: 572, 
      rmRevenue: 16.0, 
      rmPercent: 2.8, 
      rmProfit: 13.2,
      onSite: 62,
      offSite: 22,
      inStore: 16
    },
    { 
      name: 'Target', 
      totalSales: 106, 
      rmRevenue: 2.2, 
      rmPercent: 2.1, 
      rmProfit: 1.7,
      onSite: 58,
      offSite: 27,
      inStore: 15
    },
    { 
      name: 'Kroger', 
      totalSales: 148, 
      rmRevenue: 2.8, 
      rmPercent: 1.9, 
      rmProfit: 2.1,
      onSite: 55,
      offSite: 20,
      inStore: 25
    }
  ];

  const [selectedChart, setSelectedChart] = React.useState('revenue');
  
  type CountryMetrics = {
    spend: number;
    growth: number;
    retailShare: number;
    adShare: number;
  };

  const COUNTRIES = [
    'United States',
    'Australia',
    'Germany',
    'Switzerland',
    'United Kingdom',
    'France',
    'Italy',
    'Netherlands',
    'Belgium',
    'Poland',
    'Austria',
    'Japan',
    'China',
    'South Korea'
  ] as const;

  type Country = typeof COUNTRIES[number];

  const [selectedCountry, setSelectedCountry] = React.useState<Country>('United States');

  const countryMetrics: Record<Country, CountryMetrics> = {
    'United States': { spend: 45.2, growth: 38.2, retailShare: 2.6, adShare: 10.8 },
    'Australia': { spend: 3.2, growth: 35.0, retailShare: 1.6, adShare: 6.8 },
    'Germany': { spend: 7.2, growth: 30.0, retailShare: 2.1, adShare: 8.4 },
    'Switzerland': { spend: 2.1, growth: 28.5, retailShare: 1.8, adShare: 7.2 },
    'United Kingdom': { spend: 8.6, growth: 32.0, retailShare: 2.4, adShare: 9.6 },
    'France': { spend: 5.8, growth: 29.0, retailShare: 1.9, adShare: 7.8 },
    'Italy': { spend: 3.8, growth: 27.5, retailShare: 1.7, adShare: 6.9 },
    'Netherlands': { spend: 2.4, growth: 26.8, retailShare: 1.5, adShare: 6.5 },
    'Belgium': { spend: 1.8, growth: 25.5, retailShare: 1.4, adShare: 6.2 },
    'Poland': { spend: 1.5, growth: 31.5, retailShare: 1.3, adShare: 5.8 },
    'Austria': { spend: 1.2, growth: 24.8, retailShare: 1.2, adShare: 5.5 },
    'Japan': { spend: 4.9, growth: 25.0, retailShare: 1.8, adShare: 7.2 },
    'China': { spend: 32.4, growth: 42.0, retailShare: 2.8, adShare: 10.8 },
    'South Korea': { spend: 2.8, growth: 38.0, retailShare: 1.5, adShare: 6.4 }
  };

  const getChartData = () => {
    switch (selectedChart) {
      case 'revenue':
        return {
          data: countryRevenueData,
          dataKey: 'revenue',
          title: 'Overall Country Level RM Revenue',
          description: 'Total RM 2025 (E) ad spend by country',
          yAxisLabel: 'Revenue (USD Billions)',
          analysis: 'The United States leads in retail media revenue, followed by China and key European markets. Emerging markets show significant growth potential.'
        };
      case 'growth':
        return {
          data: countryGrowthData,
          dataKey: 'growth',
          title: 'RM Trajectory Growth by Country',
          description: 'RM 2025-2028 growth rate by country',
          yAxisLabel: 'Growth Rate (%)',
          analysis: 'China leads growth projections at 42%, followed by South Korea and Australia, indicating strong momentum in Asian markets.'
        };
      case 'retail':
        return {
          data: countryRetailShareData,
          dataKey: 'share',
          title: 'Relative Size of RM vs Retail Sales',
          description: 'Total RM ad spend % of Total Retail sales (2025E)',
          yAxisLabel: '% of Retail Sales',
          analysis: 'The US market shows highest RM penetration at 3.2% of retail sales, with other markets showing significant room for growth.'
        };
      case 'ad':
        return {
          data: countryAdShareData,
          dataKey: 'share',
          title: 'Relative Size of RM vs Total Ad Spend',
          description: 'Total RM ad spend % of Total Advertising spend (2025E)',
          yAxisLabel: '% of Total Ad Spend',
          analysis: 'Retail Media represents a significant portion of total ad spend, particularly in the US (12.5%) and China (10.8%).'
        };
      default:
        return {
          data: countryRevenueData,
          dataKey: 'revenue',
          title: 'Overall Country Level RM Revenue',
          description: 'Total RM 2025 (E) ad spend by country',
          yAxisLabel: 'Revenue (USD Billions)',
          analysis: 'The United States leads in retail media revenue, followed by China and key European markets. Emerging markets show significant growth potential.'
        };
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Retail Media Intelligence Dashboard</h1>
      <Tabs defaultValue="welcome" className="w-full">
        <TabsList className="w-full flex justify-between space-x-1 rounded-lg bg-muted p-1 mb-8">
          <TabsTrigger value="welcome" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Welcome</TabsTrigger>
          <TabsTrigger value="market" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Country Potential</TabsTrigger>
          <TabsTrigger value="best-in-class" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Best in Class</TabsTrigger>
          <TabsTrigger value="advertisers" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Advertiser Categories</TabsTrigger>
          <TabsTrigger value="channels" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Channel Breakdown</TabsTrigger>
          <TabsTrigger value="retailers" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Retailer Deep Dives</TabsTrigger>
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
        <TabsContent value="market">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedChart('revenue')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedChart === 'revenue' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      Overall Country Level RM Revenue
                    </button>
                    <button
                      onClick={() => setSelectedChart('growth')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedChart === 'growth' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      RM Trajectory Growth by Country
                    </button>
                    <button
                      onClick={() => setSelectedChart('retail')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedChart === 'retail' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      RM vs Retail Sales
                    </button>
                    <button
                      onClick={() => setSelectedChart('ad')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedChart === 'ad' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      RM vs Ad Spend
                    </button>
                  </div>
                  <div>
                    <CardTitle>{getChartData().title}</CardTitle>
                    <CardDescription>{getChartData().description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={getChartData().data}
                    margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" angle={-45} textAnchor="end" height={60} />
                    <YAxis label={{ value: getChartData().yAxisLabel, angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={getChartData().dataKey} fill="#8884d8" name={getChartData().yAxisLabel}>
                      {getChartData().data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <p><span className="font-semibold">Analysis:</span> {getChartData().analysis}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 bg-white">
              <CardHeader>
                <CardTitle>Country Level Retail Media Market</CardTitle>
                <CardDescription>Key Performance Metrics by Country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Country
                  </label>
                  <select
                    id="country-select"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value as Country)}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-blue-50 p-4 text-center">
                    <p className="text-sm text-gray-500">Total RM Ad Spend</p>
                    <p className="text-2xl font-bold">${countryMetrics[selectedCountry].spend}B</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </Card>
                  <Card className="bg-green-50 p-4 text-center">
                    <p className="text-sm text-gray-500">Growth Rate</p>
                    <p className="text-2xl font-bold">{countryMetrics[selectedCountry].growth}%</p>
                    <p className="text-xs text-gray-500">3-year CAGR</p>
                  </Card>
                  <Card className="bg-purple-50 p-4 text-center">
                    <p className="text-sm text-gray-500">% of Retail Sales</p>
                    <p className="text-2xl font-bold">{countryMetrics[selectedCountry].retailShare}%</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </Card>
                  <Card className="bg-yellow-50 p-4 text-center">
                    <p className="text-sm text-gray-500">% of Total Ad Spend</p>
                    <p className="text-2xl font-bold">{countryMetrics[selectedCountry].adShare}%</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </Card>
                </div>
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
        <TabsContent value="advertisers">
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
        <TabsContent value="channels">
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
        <TabsContent value="retailers">
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
    </div>
  );
};

export default RetailMediaDashboard; 
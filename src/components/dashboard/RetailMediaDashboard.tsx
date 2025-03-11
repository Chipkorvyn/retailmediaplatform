"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Pie, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line } from 'recharts';

const RetailMediaDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('welcome');

  // Mock data for visualizations
  const marketGrowthData = [
    { year: 2019, spend: 12.4, percentage: 1.2 },
    { year: 2020, spend: 18.6, percentage: 1.6 },
    { year: 2021, spend: 27.5, percentage: 1.9 },
    { year: 2022, spend: 35.8, percentage: 2.3 },
    { year: 2023, spend: 45.2, percentage: 2.6 },
    { year: 2024, spend: 54.7, percentage: 2.9 },
    { year: 2025, spend: 63.1, percentage: 3.2 },
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

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Retail Media Intelligence Dashboard</h1>
      <Tabs defaultValue="welcome" className="w-full">
        <TabsList className="w-full flex justify-between space-x-1 rounded-lg bg-muted p-1 mb-8">
          <TabsTrigger value="welcome" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Welcome</TabsTrigger>
          <TabsTrigger value="market" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Market Potential</TabsTrigger>
          <TabsTrigger value="advertisers" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Advertiser Categories</TabsTrigger>
          <TabsTrigger value="channels" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Channel Breakdown</TabsTrigger>
          <TabsTrigger value="retailers" className="rounded-md px-3 py-1.5 text-sm font-medium transition-all">Retailer Deep Dives</TabsTrigger>
        </TabsList>

        {/* Welcome Page */}
        <TabsContent value="welcome">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Retail Media 2023-2025: Market Overview & Retailer Benchmarks</CardTitle>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Market Overview */}
            <Card className="lg:col-span-2 bg-white">
              <CardHeader>
                <CardTitle>Overall Retail Media Market Potential</CardTitle>
                <CardDescription>Total & Relative Size + Growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-blue-50 p-4 text-center">
                    <p className="text-sm text-gray-500">Total RM Ad Spend</p>
                    <p className="text-2xl font-bold">$45.2B</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </Card>
                  <Card className="bg-green-50 p-4 text-center">
                    <p className="text-sm text-gray-500">Growth Rate</p>
                    <p className="text-2xl font-bold">38.2%</p>
                    <p className="text-xs text-gray-500">3-year CAGR</p>
                  </Card>
                  <Card className="bg-purple-50 p-4 text-center">
                    <p className="text-sm text-gray-500">% of Retail Sales</p>
                    <p className="text-2xl font-bold">2.6%</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </Card>
                  <Card className="bg-yellow-50 p-4 text-center">
                    <p className="text-sm text-gray-500">% of Total Ad Spend</p>
                    <p className="text-2xl font-bold">10.8%</p>
                    <p className="text-xs text-gray-500">2023</p>
                  </Card>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={marketGrowthData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="spend" name="RM Ad Spend (USD bn)" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="percentage" name="% of Total Retail Sales" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <p><span className="font-semibold">Analysis:</span> Retail Media has grown at a 38.2% CAGR over the last 3 years, capturing 10.8% of total ad spend in retail. Growth is projected to continue through 2025, reaching $63.1B.</p>
                </div>
              </CardContent>
            </Card>

            {/* Retailer Performance */}
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
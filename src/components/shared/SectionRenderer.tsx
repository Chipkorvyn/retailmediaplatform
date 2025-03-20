import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";
import { DynamicSection, DynamicSectionData, Slide } from "@/types/dashboard";

interface SectionRendererProps {
  section: DynamicSection;
  slide: Slide;
  sectionData: DynamicSectionData[];
  selectedMetric?: string;
}

export function SectionRenderer({ section, slide, sectionData, selectedMetric }: SectionRendererProps) {
  if (!sectionData || !Array.isArray(sectionData)) {
    console.error('Invalid or missing section data');
    return null;
  }

  const sectionDataItems = sectionData
    .filter(item => item && item.sectionId === section.sectionId)
    .sort((a, b) => a.originalRowIndex - b.originalRowIndex);

  switch (section.sectionType) {
    case 'chart': {
      // Debug log
      console.log('Chart section:', {
        sectionId: section.sectionId,
        slideId: section.slideId,
        slideTitle: slide.slideTitle,
        tabId: slide.tabId
      });

      const introItem = sectionDataItems.find(item => item.key === 'intro');

      // If we have a selected metric, filter data accordingly
      let chartData = sectionDataItems;
      if (selectedMetric) {
        const allOverlayIndices = sectionDataItems
          .map((item, index) => item.key === 'overlaylabel' ? index : -1)
          .filter(index => index !== -1);

        const currentMetricIndex = sectionDataItems.findIndex(
          item => item.key === 'overlaylabel' && item.value === selectedMetric
        );

        const nextMetricIndex = allOverlayIndices.find(index => index > currentMetricIndex) || sectionDataItems.length;

        chartData = sectionDataItems.slice(currentMetricIndex + 1, nextMetricIndex);
      }

      const finalChartData = chartData
        .filter(item => item.key !== 'intro' && item.key !== 'overlaylabel')
        .map(item => ({
          name: item.key,
          value: parseFloat(item.value) || 0
        }))
        .filter(item => !isNaN(item.value));

      return (
        <div className="space-y-4">
          {introItem && (
            <h3 className="text-base font-semibold mb-2 text-left">
              {introItem.value}
            </h3>
          )}
          {finalChartData.length > 0 ? (
            <BarChart
              data={finalChartData}
              xAxisKey="name"
              yAxisKey="value"
              height={400}
            />
          ) : (
            <div className="text-center text-gray-500">No chart data available</div>
          )}
          {slide.slideInsight && (
            <Card className="mt-4 bg-blue-50">
              <CardContent className="pt-4">
                <p>{slide.slideInsight}</p>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }
    case 'text':
      return (
        <div className="prose max-w-none">
          {sectionDataItems.length > 0 ? (
            sectionDataItems.map((item, index) => (
              <p key={index}>{item.value}</p>
            ))
          ) : (
            <p className="text-gray-500">No text content available</p>
          )}
        </div>
      );
    case 'list':
      return (
        <div className="space-y-2">
          <h3 className="font-semibold">{section.sectionTitle}</h3>
          {sectionDataItems.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {sectionDataItems.map((item, index) => (
                <li key={index}>{item.value}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No list items available</p>
          )}
        </div>
      );
    default:
      return null;
  }
} 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabComponentProps } from "@/types/dashboard";
import { SectionRenderer } from "@/components/shared/SectionRenderer";
import { useState } from "react";

export function CountryPotentialTab({ slides, sections, sectionData }: TabComponentProps) {
  const countryPotentialSlides = slides
    .filter(slide => slide.tabId === 'country-potential' && slide.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Get the first slide's chart sections
  const firstSlide = countryPotentialSlides[0];
  const chartSections = sections
    .filter(section => section.slideId === firstSlide?.slideId && section.isActive && section.sectionType === 'chart')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Get all metrics from all chart sections
  const metrics = sectionData
    .filter(item => 
      chartSections.some(section => section.sectionId === item.sectionId) && 
      item.key === 'overlaylabel'
    )
    .map(item => item.value);

  const [selectedMetric, setSelectedMetric] = useState(metrics[0] || '');

  // Find the section that contains the selected metric
  const selectedSection = chartSections.find(section =>
    sectionData.some(item => 
      item.sectionId === section.sectionId && 
      item.key === 'overlaylabel' && 
      item.value === selectedMetric
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{firstSlide?.slideTitle}</CardTitle>
          <CardDescription>{firstSlide?.slideSubtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metric Selection Buttons */}
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedMetric === metric
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>

          {/* Render the selected section */}
          {selectedSection && (
            <SectionRenderer
              section={selectedSection}
              slide={firstSlide}
              sectionData={sectionData}
              selectedMetric={selectedMetric}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";
import { DynamicSection, DynamicSectionData, Slide } from "@/types/dashboard";

interface SectionRendererProps {
  section: DynamicSection;
  slide: Slide;
  sectionData: DynamicSectionData[];
}

export function SectionRenderer({ section, slide, sectionData }: SectionRendererProps) {
  if (!sectionData || !Array.isArray(sectionData)) {
    console.error('Invalid or missing section data');
    return null;
  }

  const sectionDataItems = sectionData
    .filter(item => item && item.sectionId === section.sectionId)
    .sort((a, b) => {
      if (!a?.key && !b?.key) return 0;
      if (!a?.key) return 1;
      if (!b?.key) return -1;
      return a.key.localeCompare(b.key);
    });

  switch (section.sectionType) {
    case 'chart': {
      const introItem = sectionDataItems.find(item => item.key === 'intro');
      const chartData = sectionDataItems
        .filter(item => item.key !== 'intro')
        .map(item => ({
          name: item.key,
          value: parseFloat(item.value) || 0
        }))
        .filter(item => !isNaN(item.value));

      return (
        <div className="space-y-4">
          {introItem && (
            <h3 className="text-lg font-semibold text-center">
              {introItem.value}
            </h3>
          )}
          {chartData.length > 0 ? (
            <BarChart
              data={chartData}
              xAxisKey="name"
              yAxisKey="value"
              height={400}
            />
          ) : (
            <div className="text-center text-gray-500">No chart data available</div>
          )}
          {slide.slideInsight && (
            <Card className="mt-4 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Key Insight</CardTitle>
              </CardHeader>
              <CardContent>
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
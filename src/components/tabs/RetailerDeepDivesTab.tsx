import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";
import { Slide, DynamicSection, TabComponentProps } from "@/types/dashboard";

export function RetailerDeepDivesTab({ slides, sections, sectionData }: TabComponentProps) {
  const retailerDeepDivesSlides = slides
    .filter(slide => slide.tabId === 'retailer-deep-dives' && slide.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const renderSection = (slide: Slide, section: DynamicSection) => {
    const sectionDataItems = sectionData
      .filter(item => item.sectionId === section.sectionId)
      .sort((a, b) => a.key.localeCompare(b.key));

    switch (section.sectionType) {
      case 'chart': {
        const introItem = sectionDataItems.find(item => item.key === 'intro');
        const chartData = sectionDataItems
          .filter(item => item.key !== 'intro')
          .map(item => ({
            name: item.key,
            value: parseFloat(item.value)
          }));

        return (
          <div key={section.sectionId} className="space-y-4">
            {introItem && (
              <h3 className="text-lg font-semibold text-center">
                {introItem.value}
              </h3>
            )}
            <BarChart
              data={chartData}
              xAxisKey="name"
              yAxisKey="value"
              height={400}
            />
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
          <div key={section.sectionId} className="prose max-w-none">
            {sectionDataItems.map((item, index) => (
              <p key={index}>{item.value}</p>
            ))}
          </div>
        );
      case 'list':
        return (
          <div key={section.sectionId} className="space-y-2">
            <h3 className="font-semibold">{section.sectionTitle}</h3>
            <ul className="list-disc pl-5 space-y-2">
              {sectionDataItems.map((item, index) => (
                <li key={index}>{item.value}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {retailerDeepDivesSlides.map((slide, index) => {
        const slidesSections = sections
          .filter(section => section.slideId === slide.slideId && section.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        return (
          <Card key={slide.slideId} className={index > 0 ? "mt-6" : ""}>
            <CardHeader>
              <CardTitle>{slide.slideTitle}</CardTitle>
              <CardDescription>{slide.slideSubtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {slidesSections.map(section => renderSection(slide, section))}
              {slide.slideFooter && (
                <div className="text-sm text-gray-500 mt-4">
                  {slide.slideFooter}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
} 
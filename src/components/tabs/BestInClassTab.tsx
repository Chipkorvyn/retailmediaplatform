import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabComponentProps } from "@/types/dashboard";
import { SectionRenderer } from "@/components/shared/SectionRenderer";

export function BestInClassTab({ slides, sections, sectionData }: TabComponentProps) {
  const bestInClassSlides = slides
    .filter(slide => slide.tabId === 'best-in-class' && slide.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Debug log
  console.log('Best in Class sections:', sections.map(s => ({ id: s.sectionId, type: s.sectionType })));

  const renderRightSlideContent = () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Revenue & Profitability Analysis</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium mb-2">Top Performer</h4>
            <h3 className="text-xl font-bold mb-1">Amazon</h3>
            <div className="text-sm">
              <p>4.2% RM/Sales Ratio</p>
              <p>84% Profit Margin</p>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Fast Riser</h4>
            <h3 className="text-xl font-bold mb-1">Walmart</h3>
            <div className="text-sm">
              <p>2.8% RM/Sales Ratio</p>
              <p>78% Profit Margin</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Success Factors</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Strong first-party data capabilities</li>
            <li>Advanced targeting and measurement</li>
            <li>Integrated omnichannel approach</li>
            <li>Robust self-service platforms</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Growth Opportunities</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Expansion into off-site media</li>
            <li>Enhanced measurement solutions</li>
            <li>Cross-retailer partnerships</li>
            <li>Innovation in ad formats</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {bestInClassSlides.map((slide, index) => {
        const slidesSections = sections
          .filter(section => section.slideId === slide.slideId && section.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        // Debug log
        console.log('Slide sections:', slidesSections.map(s => ({ id: s.sectionId, type: s.sectionType })));

        return (
          <Card key={slide.slideId} className="h-full">
            <CardHeader>
              <CardTitle>{slide.slideTitle}</CardTitle>
              <CardDescription>{slide.slideSubtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              {index === 0 ? (
                <div className="space-y-6">
                  {slidesSections.map(section => (
                    <SectionRenderer
                      key={section.sectionId}
                      section={section}
                      slide={slide}
                      sectionData={sectionData}
                    />
                  ))}
                  {slide.slideFooter && (
                    <div className="text-sm text-gray-500 mt-4">
                      {slide.slideFooter}
                    </div>
                  )}
                </div>
              ) : (
                renderRightSlideContent()
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 
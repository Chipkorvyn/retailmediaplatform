import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabComponentProps } from "@/types/dashboard";
import { DynamicSectionData } from "@/types/dashboard";
import { ReactNode } from "react";
import { BarChart } from "@/components/ui/bar-chart";
import { DoughnutChart } from "@/components/ui/doughnut-chart";
import { SectionRenderer } from "@/components/shared/SectionRenderer";

// Custom sort function for section data
const customSort = (a: DynamicSectionData, b: DynamicSectionData) => {
  if (a.key === 'intro') return -1;
  if (b.key === 'intro') return 1;
  
  // Extract numbers from keys (e.g., "bullet1" -> 1)
  const getNumber = (key: string) => {
    const match = key.match(/\d+$/);
    return match ? parseInt(match[0]) : 0;
  };
  
  return getNumber(a.key) - getNumber(b.key);
};

// Get section wrapper based on section ID
const getSectionWrapper = (sectionId: string, sectionData: DynamicSectionData[]) => {
  const introData = sectionData.find(item => item.key === 'intro');
  const title = introData?.value || '';

  const DataSourcesWrapper = ({ children }: { children: ReactNode }) => (
    <div className="rounded-lg bg-muted/50 p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 list-disc pl-5">
        {children}
      </ul>
    </div>
  );
  DataSourcesWrapper.displayName = 'DataSourcesWrapper';

  const WarningWrapper = ({ children }: { children: ReactNode }) => (
    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
      <p className="text-amber-800 font-medium">{children}</p>
    </div>
  );
  WarningWrapper.displayName = 'WarningWrapper';

  switch (sectionId) {
    case 's1-slide1-welcome':
      return DataSourcesWrapper;
    case 's4-slide1-welcome':
      return WarningWrapper;
    default:
      return ({ children }: { children: ReactNode }) => <div>{children}</div>;
  }
};

export function WelcomeTab({ slides, sections, sectionData }: TabComponentProps) {
  const welcomeSlides = slides
    .filter(slide => slide.tabId === 'welcome' && slide.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {welcomeSlides.map((slide, index) => (
        <Card key={slide.slideId} className={index > 0 ? "mt-6" : ""}>
          <CardHeader>
            <CardTitle>{slide.slideTitle}</CardTitle>
            <CardDescription>{slide.slideSubtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* History and Key Developments section */}
            {sections
              .filter(section => section.slideId === slide.slideId && section.isActive && section.sectionId === 's1-slide1-welcome')
              .map(section => {
                const sectionDataItems = sectionData
                  .filter(item => item.sectionId === section.sectionId)
                  .sort(customSort);
                const Wrapper = getSectionWrapper(section.sectionId, sectionDataItems);
                const bulletItems = sectionDataItems.filter(item => item.key.startsWith('bullet'));

                return (
                  <Wrapper key={section.sectionId}>
                    {bulletItems.map(item => (
                      <li key={item.key}>{item.value}</li>
                    ))}
                  </Wrapper>
                );
              })}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Market Size Chart */}
              {sections
                .filter(section => section.slideId === slide.slideId && section.isActive && section.sectionId === 's2-slide1-welcome')
                .map(section => (
                  <Card key={section.sectionId} className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {sectionData.find(item => item.sectionId === section.sectionId && item.key === 'intro')?.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BarChart
                        data={sectionData
                          .filter(item => 
                            item.sectionId === section.sectionId && 
                            item.key !== 'intro' &&
                            !isNaN(parseInt(item.key))
                          )
                          .sort((a, b) => parseInt(a.key) - parseInt(b.key))
                          .map(item => ({
                            name: item.key,
                            value: parseFloat(item.value)
                          }))}
                        xAxisKey="name"
                        yAxisKey="value"
                        height={300}
                      />
                    </CardContent>
                  </Card>
                ))}

              {/* Channel Distribution Chart */}
              {sections
                .filter(section => section.slideId === slide.slideId && section.isActive && section.sectionId === 's3-slide1-welcome')
                .map(section => (
                  <Card key={section.sectionId} className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {sectionData.find(item => item.sectionId === section.sectionId && item.key === 'intro')?.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DoughnutChart
                        data={sectionData
                          .filter(item => 
                            item.sectionId === section.sectionId && 
                            item.key !== 'intro' &&
                            ['US', 'China', 'Europe', 'RoW'].includes(item.key.trim())
                          )
                          .map(item => ({
                            name: item.key.trim(),
                            value: parseFloat(item.value)
                          }))
                          .filter(item => !isNaN(item.value))}
                        height={300}
                      />
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Warning section */}
            {sections
              .filter(section => section.slideId === slide.slideId && section.isActive && section.sectionId === 's4-slide1-welcome')
              .map(section => {
                const sectionDataItems = sectionData
                  .filter(item => item.sectionId === section.sectionId)
                  .sort(customSort);
                const Wrapper = getSectionWrapper(section.sectionId, sectionDataItems);
                const textItem = sectionDataItems.find(item => item.key === 'text');

                return (
                  <Wrapper key={section.sectionId}>
                    {textItem?.value}
                  </Wrapper>
                );
              })}
            
            {slide.slideFooter && (
              <div className="text-sm text-gray-500 mt-4">
                {slide.slideFooter}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
} 
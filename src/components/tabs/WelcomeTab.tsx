import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionRenderer } from "@/components/shared/SectionRenderer";
import { TabComponentProps } from "@/types/dashboard";
import { DynamicSection, DynamicSectionData } from "@/types/dashboard";
import { ReactNode } from "react";

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

  switch (sectionId) {
    case 's1-slide1-welcome':
      return ({ children }: { children: ReactNode }) => (
        <div className="rounded-lg bg-muted/50 p-6">
          <h3 className="font-semibold mb-3">{title}</h3>
          <ul className="space-y-2 list-disc pl-5">
            {children}
          </ul>
        </div>
      );
    case 's2-slide1-welcome':
      return ({ children }: { children: ReactNode }) => (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
          <p className="text-amber-800 font-medium">{children}</p>
        </div>
      );
    case 's3-slide1-welcome':
      return ({ children }: { children: ReactNode }) => (
        <Card className="bg-blue-50/50">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              {children}
            </ul>
          </CardContent>
        </Card>
      );
    case 's4-slide1-welcome':
      return ({ children }: { children: ReactNode }) => (
        <Card className="bg-green-50/50">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              {children}
            </ul>
          </CardContent>
        </Card>
      );
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
            {/* Data Sources section */}
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

            {/* Overview and Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dashboard Overview */}
              {sections
                .filter(section => section.slideId === slide.slideId && section.isActive && section.sectionId === 's3-slide1-welcome')
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

              {/* Key Questions */}
              {sections
                .filter(section => section.slideId === slide.slideId && section.isActive && section.sectionId === 's4-slide1-welcome')
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
            </div>

            {/* Warning section - moved to bottom */}
            {sections
              .filter(section => section.slideId === slide.slideId && section.isActive && section.sectionId === 's2-slide1-welcome')
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
              <div className="text-sm text-gray-500">
                {slide.slideFooter}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
} 
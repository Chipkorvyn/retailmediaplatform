import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabComponentProps } from "@/types/dashboard";
import { SectionRenderer } from "@/components/shared/SectionRenderer";

interface Slide {
  slideId: string;
  tabId: string;
  slideTitle: string;
  slideSubtitle: string;
  slideInsight: string;
  slideFooter: string;
  sortOrder: number;
  isActive: boolean;
}

interface DynamicSection {
  sectionId: string;
  slideId: string;
  sectionType: string;
  sectionTitle: string;
  sortOrder: number;
  isActive: boolean;
}

interface DynamicSectionData {
  sectionId: string;
  key: string;
  value: string;
}

interface BestInClassTabProps {
  slides: Slide[];
  sections: DynamicSection[];
  sectionData: DynamicSectionData[];
  globalStrings: {
    key: string;
    value: string;
  }[];
}

export function BestInClassTab({ slides, sections, sectionData }: TabComponentProps) {
  const bestInClassSlides = slides
    .filter(slide => slide.tabId === 'best-in-class' && slide.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {bestInClassSlides.map((slide, index) => {
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
            </CardContent>
          </Card>
        );
      })}
    </>
  );
} 
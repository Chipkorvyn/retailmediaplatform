import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionRenderer } from "@/components/shared/SectionRenderer";
import { Slide, DynamicSection, DynamicSectionData, GlobalString } from "@/types/dashboard";

interface AdvertiserCategoriesTabProps {
  slides: Slide[];
  sections: DynamicSection[];
  sectionData: DynamicSectionData[];
  globalStrings?: GlobalString[];
}

export function AdvertiserCategoriesTab({ slides, sections, sectionData }: AdvertiserCategoriesTabProps) {
  const advertiserCategoriesSlides = slides
    .filter(slide => slide.tabId === 'advertiser-categories' && slide.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      {advertiserCategoriesSlides.map((slide, index) => {
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
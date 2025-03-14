import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomeTabProps {
  slides: {
    slideId: string;
    tabId: string;
    slideTitle: string;
    slideSubtitle: string;
    slideInsight: string;
    slideFooter: string;
    sortOrder: number;
    isActive: boolean;
  }[];
  globalStrings: {
    key: string;
    value: string;
  }[];
}

export function WelcomeTab({ slides, globalStrings }: WelcomeTabProps) {
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
export interface Slide {
  slideId: string;
  tabId: string;
  slideTitle: string;
  slideSubtitle: string;
  slideInsight: string;
  slideFooter: string;
  sortOrder: number;
  isActive: boolean;
}

export interface DynamicSection {
  sectionId: string;
  slideId: string;
  sectionType: string;
  sortOrder: number;
  isActive: boolean;
  sectionTitle: string;
}

export interface DynamicSectionData {
  sectionId: string;
  key: string;
  value: string;
  originalRowIndex: number;
}

export interface GlobalString {
  key: string;
  value: string;
}

export interface TabComponentProps {
  slides: Slide[];
  sections: DynamicSection[];
  sectionData: DynamicSectionData[];
  globalStrings?: GlobalString[];
} 
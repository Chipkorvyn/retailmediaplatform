import { FC } from 'react';
import { WelcomeTab } from './WelcomeTab';
import { CountryPotentialTab } from './CountryPotentialTab';
import { BestInClassTab } from './BestInClassTab';
import { AdvertiserCategoriesTab } from './AdvertiserCategoriesTab';
import { ChannelBreakdownTab } from './ChannelBreakdownTab';
import { RetailerDeepDivesTab } from './RetailerDeepDivesTab';
import { TabComponentProps } from '@/types/dashboard';

export const TabComponents: Record<string, FC<TabComponentProps>> = {
  welcome: WelcomeTab,
  'country-potential': CountryPotentialTab,
  'best-in-class': BestInClassTab,
  'advertiser-categories': AdvertiserCategoriesTab,
  'channel-breakdown': ChannelBreakdownTab,
  'retailer-deep-dives': RetailerDeepDivesTab
}; 
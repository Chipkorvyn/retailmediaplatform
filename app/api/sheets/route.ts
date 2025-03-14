import { google } from 'googleapis'
import { NextResponse } from 'next/server'
import { GaxiosError } from 'gaxios'

// Cache duration in seconds (5 minutes)
const CACHE_DURATION = 300

// Define interfaces for data structure
interface Section {
  tabName: string;
  sectionName: string;
  sectionId: string;
  chartType: string;
  description: string;
  sortOrder: number;
}

interface SectionData {
  sectionId: string;
  label: string;
  value: number;
}

interface GlobalString {
  key: string;
  value: string;
}

interface MarketResponse {
  sections: Section[];
  sectionData: SectionData[];
}

interface GlobalsResponse {
  globalStrings: GlobalString[];
}

interface ErrorResponse {
  error: string;
  details?: string;
  code?: number;
}

interface Tab {
  tabId: string;
  tabName: string;
  tabTitle: string;
  tabSubtitle: string;
  sortOrder: number;
  isActive: boolean;
}

interface TabsResponse {
  tabs: Tab[];
}

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

interface SlidesResponse {
  slides: Slide[];
}

interface DynamicSection {
  sectionId: string;
  slideId: string;
  sectionType: string;
  sortOrder: number;
  isActive: boolean;
}

interface DynamicSectionsResponse {
  sections: DynamicSection[];
}

interface DynamicSectionData {
  sectionId: string;
  key: string;
  value: string;
}

interface DynamicSectionDataResponse {
  sectionData: DynamicSectionData[];
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Get the type parameter from the URL
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'market';

    // Initialize Google Sheets API client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      const errorResponse: ErrorResponse = {
        error: 'Spreadsheet ID is not configured'
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    if (type === 'sections') {
      // Fetch sections data
      const sectionsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sections!A2:E',
      });

      const sections = (sectionsResponse.data.values || []).map((row) => ({
        sectionId: row[0],
        slideId: row[1],
        sectionType: row[2],
        sortOrder: parseInt(row[3]) || 0,
        isActive: row[4] === 'TRUE',
      }));

      const response: DynamicSectionsResponse = {
        sections: sections.sort((a, b) => a.sortOrder - b.sortOrder),
      };

      return new NextResponse(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    } else if (type === 'sectionData') {
      // Fetch section data
      const sectionDataResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'SectionData!A2:C',
      });

      if (!sectionDataResponse.data.values) {
        console.error('No section data found in spreadsheet');
        return NextResponse.json({ sectionData: [] });
      }

      const sectionData = sectionDataResponse.data.values
        .filter(row => row.length >= 3) // Ensure row has all required fields
        .map((row) => ({
          sectionId: row[0] || '',
          key: row[1] || '',
          value: row[2] || '',
        }))
        .filter(item => item.sectionId && item.key); // Filter out invalid entries

      console.log('Processed section data:', sectionData);

      const response: DynamicSectionDataResponse = {
        sectionData,
      };

      return new NextResponse(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    } else if (type === 'slides') {
      // Fetch slides data
      const slidesResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Slides!A2:H',
      });

      const slides = (slidesResponse.data.values || []).map((row) => ({
        slideId: row[0],
        tabId: row[1],
        slideTitle: row[2],
        slideSubtitle: row[3],
        slideInsight: row[4],
        slideFooter: row[5],
        sortOrder: parseInt(row[6]) || 0,
        isActive: row[7] === 'TRUE',
      }));

      const response: SlidesResponse = {
        slides: slides.sort((a, b) => a.sortOrder - b.sortOrder),
      };

      return new NextResponse(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    } else if (type === 'tabs') {
      // Fetch tabs data
      const tabsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Tabs!A2:F',
      });

      const tabs = (tabsResponse.data.values || []).map((row) => ({
        tabId: row[0],
        tabName: row[1],
        tabTitle: row[2],
        tabSubtitle: row[3],
        sortOrder: parseInt(row[4]) || 0,
        isActive: row[5] === 'TRUE',
      }));

      const response: TabsResponse = {
        tabs: tabs.sort((a, b) => a.sortOrder - b.sortOrder),
      };

      return new NextResponse(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    } else if (type === 'globals') {
      // Fetch global strings
      const globalsResponse = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'GlobalStrings!A2:B',
        // Add valueRenderOption to get raw values
        valueRenderOption: 'UNFORMATTED_VALUE',
      });

      if (!globalsResponse.data.values) {
        console.error('No global strings found in spreadsheet');
        return NextResponse.json({ globalStrings: [] });
      }

      const globalStrings = globalsResponse.data.values
        .filter(row => row.length >= 2) // Ensure row has both key and value
        .map((row) => ({
          key: String(row[0] || '').trim(),
          value: String(row[1] || '').trim(),
        }))
        .filter(item => item.key && item.value); // Filter out invalid entries

      console.log('Processed global strings:', JSON.stringify(globalStrings, null, 2));

      const response: GlobalsResponse = {
        globalStrings,
      };

      // Return with no-cache headers
      return new NextResponse(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    } else {
      // Fetch market data
      const [sectionsResponse, sectionDataResponse] = await Promise.all([
        sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'Sections!A2:G',
        }),
        sheets.spreadsheets.values.get({
          spreadsheetId,
          range: 'SectionData!A2:C',
        }),
      ]);

      // Process sections
      const sections = (sectionsResponse.data.values || []).map((row) => ({
        tabName: row[1],
        sectionName: row[3],
        sectionId: row[0],
        chartType: row[2],
        description: row[4],
        sortOrder: parseInt(row[5]) || 0,
      }));

      // Process section data
      const sectionData = (sectionDataResponse.data.values || []).map((row) => ({
        sectionId: row[0],
        label: row[1],
        value: parseFloat(row[2]),
      }));

      // Filter sections for market tab and sort by order
      const marketSections = sections
        .filter(section => section.tabName === 'market')
        .sort((a, b) => a.sortOrder - b.sortOrder);

      // Get all section data for market tab sections
      const marketSectionData = sectionData.filter(data => 
        marketSections.some(section => section.sectionId === data.sectionId)
      );

      const response: MarketResponse = {
        sections: marketSections,
        sectionData: marketSectionData,
      };

      return new NextResponse(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    }
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    
    const sheetsError = error as GaxiosError;
    const errorResponse: ErrorResponse = {
      error: 'Failed to fetch data from Google Sheets',
      details: sheetsError.message,
      code: sheetsError.status || 500
    };
    
    return NextResponse.json(errorResponse, { status: sheetsError.status || 500 });
  }
} 
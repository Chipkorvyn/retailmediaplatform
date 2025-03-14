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

    if (type === 'tabs') {
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
      });

      const globalStrings = (globalsResponse.data.values || []).map((row) => ({
        key: row[0],
        value: row[1],
      }));

      const response: GlobalsResponse = {
        globalStrings,
      };

      return new NextResponse(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
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
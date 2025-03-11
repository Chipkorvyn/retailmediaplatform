import { google } from 'googleapis'
import { NextResponse } from 'next/server'

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

interface TabData {
  sections: Section[];
  sectionData: SectionData[];
}

interface GoogleSheetsError {
  message: string;
  code?: number;
}

export async function GET() {
  try {
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
      return NextResponse.json(
        { error: 'Spreadsheet ID is not configured' },
        { status: 500 }
      );
    }

    // Fetch data from all required sheets
    const [, sectionsResponse, sectionDataResponse] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Tabs!A2:E',
      }),
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

    const marketTabData = {
      sections: marketSections,
      sectionData: marketSectionData,
    };

    // Return response with cache headers
    return new NextResponse(JSON.stringify(marketTabData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    
    const sheetsError = error as GoogleSheetsError;
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch data from Google Sheets',
        details: sheetsError.message,
        code: sheetsError.code || 500
      },
      { status: sheetsError.code || 500 }
    );
  }
} 
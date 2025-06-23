import {google} from 'googleapis';
import type {BookEntry} from '@/lib/types';

export async function appendToSheet(book: BookEntry) {
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;
  const SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
  const PRIVATE_KEY = process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    console.warn('Google Sheets credentials are not set in .env. Skipping sheet append.');
    return;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: SERVICE_ACCOUNT_EMAIL,
        private_key: PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({version: 'v4', auth});

    const values = [
        [
            book.timestamp,
            book.childName,
            book.bookTitle,
            book.author,
            book.pages,
            book.coverImage || ''
        ]
    ];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'A1', // Appends to the first empty row of the sheet
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    console.log('Appended to Google Sheet successfully.');
  } catch (error) {
    console.error('Error appending to Google Sheet:', error);
    // We don't want to throw here, as it might break the main app flow
  }
}

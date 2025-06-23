import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = '1Wu4MWfB4tXD7qDygAYIwjCR_xmJUBLDi4iuQKCrDZrg';
const SHEET_RANGE = 'Sheet1!A1'; // adjust based on your headers

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: SCOPES,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, book, date, pages, points } = body;

  try {
    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() as JWT });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, book, date, pages, points]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error writing to sheet:', err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
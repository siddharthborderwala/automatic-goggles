import { join } from 'path';
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: join(__dirname, 'path-to-firebase-admin-sdk.json'),
  scopes: [
    'https://www.googleapis.com/auth/drive',
  ],
});

export const drive = google.drive({
  version: 'v3',
  auth,
});

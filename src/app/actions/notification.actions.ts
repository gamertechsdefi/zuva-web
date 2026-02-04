"use server";

export interface SendNewsNotificationParams {
  newsId: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
}

export interface OneSignalNotificationData {
  type: 'news';
  newsId: string;
}

/**
 * Server Action to send push notification via OneSignal
 * This runs securely on the server, so it can access environment variables
 */
export async function sendNewsNotificationAction({
  newsId,
  title,
  excerpt,
  imageUrl,
}: SendNewsNotificationParams): Promise<{ success: boolean; error?: string }> {
  const API_URL = 'https://onesignal.com/api/v1/notifications';
  const APP_ID = process.env.ONESIGNAL_APP_ID;
  const API_KEY = process.env.ONESIGNAL_API_KEY;

  if (!APP_ID || !API_KEY) {
    console.error('OneSignal credentials not configured on server');
    return { success: false, error: 'OneSignal credentials missing in server environment' };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${API_KEY}`,
      },
      body: JSON.stringify({
        app_id: APP_ID,
        // Target only users with news_enabled tag
        filters: [
          { field: 'tag', key: 'news_enabled', relation: '=', value: 'true' }
        ],
        // included_segments: ['All'], // Commented out debug broadcast
        headings: { en: '📰 New Article Published!' },
        contents: { en: title },
        subtitle: excerpt ? { en: excerpt } : undefined,
        big_picture: imageUrl,
        data: {
          type: 'news',
          newsId: newsId,
        } as OneSignalNotificationData,
        // Using default channel to avoid API 400 errors
        // android_channel_id: 'news_updates',
        // ios_category: 'NEWS',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OneSignal API error:', errorText);
      return { success: false, error: `OneSignal API failed: ${response.status} ${errorText}` };
    }

    const result = await response.json();
    console.log('OneSignal notification sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Failed to send OneSignal notification:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

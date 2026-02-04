/**
 * OneSignal Push Notification Service
 * Sends push notifications to mobile app users via OneSignal REST API
 */

export interface OneSignalNotificationData {
  type: 'news';
  newsId: string;
}

export interface SendNewsNotificationParams {
  newsId: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
}

export class OneSignalService {
  private static readonly API_URL = 'https://onesignal.com/api/v1/notifications';
  private static readonly APP_ID = process.env.ONESIGNAL_APP_ID;
  private static readonly API_KEY = process.env.ONESIGNAL_API_KEY;

  /**
   * Send push notification for newly published news article
   * Only sends to users who have news notifications enabled (news_enabled tag)
   */
  static async sendNewsNotification({
    newsId,
    title,
    excerpt,
    imageUrl,
  }: SendNewsNotificationParams): Promise<void> {
    if (!this.APP_ID || !this.API_KEY) {
      console.error('OneSignal credentials not configured');
      throw new Error('OneSignal credentials missing in environment variables');
    }

    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.API_KEY}`,
        },
        body: JSON.stringify({
          app_id: this.APP_ID,
          // Target only users with news_enabled tag
          filters: [
            { field: 'tag', key: 'news_enabled', relation: '=', value: 'true' }
          ],
          headings: { en: '📰 New Article Published!' },
          contents: { en: title },
          subtitle: excerpt ? { en: excerpt } : undefined,
          big_picture: imageUrl,
          data: {
            type: 'news',
            newsId: newsId,
          } as OneSignalNotificationData,
          android_channel_id: 'news_updates',
          ios_category: 'NEWS',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OneSignal API error:', errorText);
        throw new Error(`OneSignal API failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log('OneSignal notification sent successfully:', result);
    } catch (error) {
      console.error('Failed to send OneSignal notification:', error);
      // Don't throw - we don't want notification failures to block publishing
      // Just log the error
    }
  }

  /**
   * Send a test notification (for debugging)
   */
  static async sendTestNotification(): Promise<void> {
    await this.sendNewsNotification({
      newsId: 'test-123',
      title: 'Test Notification',
      excerpt: 'This is a test notification from the admin panel',
    });
  }
}

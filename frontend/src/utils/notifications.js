// utils/notifications.js
export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission !== 'denied') {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  }
  return false;
}

export function sendQuizNotification() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification('Nepal Cyber Resilience', {
      body: 'Your daily bonus quiz is ready! Test your cybersecurity skills and earn a cheer! 🎉',
      icon: '/icon-quiz.png'
    });
  }
}

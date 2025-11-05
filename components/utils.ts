export const handleShare = async (title: string, text: string, url: string = window.location.href) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else {
    // Fallback for browsers that do not support the Web Share API
    alert('Sharing is not supported on this browser. You can manually copy the link.');
  }
};

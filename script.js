/**
 * وظيفة تحديث بيانات الإشعارات (Media Session API)
 * تقوم هذه الوظيفة بعرض صورة الأغنية واسمها والتحكم بها من خارج المتصفح
 */
function updateMediaSession() {
    if ('mediaSession' in navigator && currentSong) {
        // تعيين بيانات الأغنية (Metadata)
        navigator.mediaSession.metadata = new MediaMetadata({
            title: currentSong.title,
            artist: currentSong.artist,
            album: 'مكتبتي الموسيقية',
            artwork: [
                { src: currentSong.cover, sizes: '96x96',   type: 'image/png' },
                { src: currentSong.cover, sizes: '128x128', type: 'image/png' },
                { src: currentSong.cover, sizes: '192x192', type: 'image/png' },
                { src: currentSong.cover, sizes: '256x256', type: 'image/png' },
                { src: currentSong.cover, sizes: '384x384', type: 'image/png' },
                { src: currentSong.cover, sizes: '512x512', type: 'image/png' },
            ]
        });

        // ربط أزرار التحكم في الإشعارات بالوظائف الموجودة في الكود الخاص بك
        
        // زر تشغيل/إيقاف
        navigator.mediaSession.setActionHandler('play', () => {
            if (!isPlaying) togglePlay();
        });

        navigator.mediaSession.setActionHandler('pause', () => {
            if (isPlaying) togglePlay();
        });

        // زر الأغنية السابقة
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            prevTrack();
        });

        // زر الأغنية التالية
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            nextTrack();
        });

        // ميزة التقديم (10 ثواني)
        navigator.mediaSession.setActionHandler('seekforward', () => {
            audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
        });

        // ميزة التأخير (10 ثواني)
        navigator.mediaSession.setActionHandler('seekbackward', () => {
            audio.currentTime = Math.max(audio.currentTime - 10, 0);
        });
    }
}

/**
 * ملاحظة هامة لدمج الكود:
 * 1. يجب استدعاء وظيفة updateMediaSession() داخل وظيفة playSong(id) بعد سطر audio.play().
 * 2. يجب تحديث حالة التشغيل داخل وظيفة togglePlay() كالتالي:
 * if (isPlaying) navigator.mediaSession.playbackState = "playing";
 * else navigator.mediaSession.playbackState = "paused";
 */
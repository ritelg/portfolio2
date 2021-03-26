/**
 * @param {string} src Lien de la vidéo
 * @param {Object} optionsVideos
 * @param {boolean} optionsVideos.muted
 * @param {boolean} optionsVideos.autoplay
 * @param {boolean} optionsVideos.loop
 * @param {boolean} optionsVideos.mp4
 * @param {boolean} optionsVideos.ogg
 */
export function createVideo(src, classes, optionsVideos = {}) {
    optionsVideos = Object.assign({
        muted: true,
        autoplay: true,
        loop: true,
        mp4: true,
        ogg: false
    }, optionsVideos)

    const video = document.createElement('video')
    video.autoplay = optionsVideos.autoplay
    video.loop = optionsVideos.loop
    video.muted = optionsVideos.muted
    video.classList = classes
    
    if (optionsVideos.mp4) {
        const sourceMp4 = document.createElement('source')
        sourceMp4.setAttribute('src', src + '.mp4')
        sourceMp4.setAttribute('type','video/mp4')
        video.appendChild(sourceMp4)
    }

    if (optionsVideos.ogg) {
        const sourceOgg = document.createElement('source')
        sourceOgg.setAttribute('src', src + '.ogg')
        sourceOgg.setAttribute('type', 'video/ogg')
        video.appendChild(sourceOgg)
    }

    return video
}
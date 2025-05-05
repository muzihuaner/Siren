document.addEventListener('DOMContentLoaded', () => {
    const sirenItems = document.querySelectorAll('.siren-item');
    const muteButton = document.getElementById('muteButton');
    const muteIcon = muteButton.querySelector('.mute-icon');
    let isMuted = false;
    let currentAudio = null;
    let activeItem = null;

    // 音频上下文
    let audioContext;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.error('创建音频上下文失败:', e);
        alert('您的浏览器可能不支持Web Audio API，请尝试使用最新版本的Chrome或Firefox浏览器。');
        return;
    }
    let gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);

    // 静音控制
    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        muteIcon.textContent = isMuted ? '🔇' : '🔊';
        gainNode.gain.value = isMuted ? 0 : 1;
    });

    // 处理每个警报器的点击事件
    sirenItems.forEach(item => {
        const light = item.querySelector('.light');
        const soundFile = item.dataset.sound;
        let audioBuffer = null;
        let isPlaying = false;

        // 预加载音频文件
        if (soundFile) {
            fetch(`static/music/${soundFile}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.arrayBuffer();
                })
                .then(arrayBuffer => {
                    console.log(`正在解码音频文件: ${soundFile}`);
                    return audioContext.decodeAudioData(arrayBuffer);
                })
                .then(buffer => {
                    console.log(`音频文件加载成功: ${soundFile}`);
                    audioBuffer = buffer;
                })
                .catch(error => {
                    console.error(`加载音频文件 ${soundFile} 时出错:`, error);
                    if (error.name === 'EncodingError') {
                        console.log('音频编码错误，可能是文件格式不支持或文件损坏');
                    }
                    alert(`无法加载音频文件 ${soundFile}，请确保文件格式为MP3且未损坏。`);
                });
        }

        item.addEventListener('click', () => {
            if (activeItem && activeItem !== item) {
                // 停止其他正在播放的警报器
                const activeLight = activeItem.querySelector('.light');
                activeLight.classList.remove('active');
                activeItem.classList.remove('active');
                if (currentAudio) {
                    currentAudio.stop();
                }
            }

            isPlaying = !isPlaying;
            
            if (isPlaying) {
                activeItem = item;
                light.classList.add('active');
                item.classList.add('active');
                
                if (audioBuffer && !isMuted) {
                    playSound(audioBuffer);
                }
            } else {
                light.classList.remove('active');
                item.classList.remove('active');
                if (currentAudio) {
                    currentAudio.stop();
                }
                activeItem = null;
            }
        });
    });

    // 播放音频的函数
    function playSound(buffer) {
        if (currentAudio) {
            currentAudio.stop();
        }

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gainNode);
        source.start(0);
        currentAudio = source;
    }
}); 
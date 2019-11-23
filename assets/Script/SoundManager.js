cc.Class({
    extends: cc.Component,

    properties: {
        // 用于记录游戏中需要用到的所有 AudioClip 资源
        audioClipPool: {
            default: [],
            type: cc.AudioClip
        },
        // 音效是否循环播放
        loop: true,
        // 播放声音大小
        soundVolume: {
            default: 1,
            range: [0,1,0.1],
            slide: true
        },
        // 背景音乐的音频播放实例Id
        _audioId: null,
    },

    // 根据指令播放音乐
    playSound (command, loop, soundVolume) {
        cc.audioEngine.stopAll();
        if (loop === null && loop === undefined) {
            loop = this.loop;
        }
        if (soundVolume === null && soundVolume === undefined) {
            soundVolume = this.soundVolume;
        }
        if (command !== null || command !== undefined) {
            switch (command) {
                case "begin":
                case "score":
                    this._audioId = cc.audioEngine.play(this.audioClipPool[0], loop, soundVolume);
                    break;
                case "pass":
                    this._audioId = cc.audioEngine.play(this.audioClipPool[1], loop, soundVolume);
                    break;
                case "hit":
                    this._audioId = cc.audioEngine.play(this.audioClipPool[2], loop, soundVolume);
                    break;
                case "lose":
                    this._audioId = cc.audioEngine.play(this.audioClipPool[3], loop, soundVolume);
                    break;
                case "second":
                    this._audioId = cc.audioEngine.play(this.audioClipPool[4], loop, soundVolume);
                    break;
                case "click":
                    this._audioId = cc.audioEngine.play(this.audioClipPool[5], loop, soundVolume);
                    break;
                case "bgm":
                    this._audioId = cc.audioEngine.play(this.audioClipPool[6], loop, soundVolume);
                    break;
                default:
                    console.error("Command is invalid");
            }
        }
    },

    // 停止所有音效
    stopAll() {
        cc.audioEngine.stopAll();
        this._audioId = null;
    },

    // 调节音量
    setVolume(value) {
        if(!isNaN(value)) {
            this.soundVolume = value;
            cc.audioEngine.setVolume(value);
        }
    },
    // 暂停所有音效
    pauseMusic () {
        cc.audioEngine.pauseAll();
    },
    // 恢复
    resumeMusic () {
        cc.audioEngine.resumeAll();
        },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});

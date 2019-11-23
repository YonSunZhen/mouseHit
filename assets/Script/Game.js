let difficult = cc.Enum({
    simple: 1000,
    ordinary: 2500,
    difficult: 5000
});
cc.Class({
    extends: cc.Component,

    properties: {
        // 锤子
        hammer: {
            default: null,
            type: cc.Prefab
        },
        // 地鼠节点
        mouseNodes: {
            default: null,
            type: cc.Node
        },
        // 地鼠的种类
        animalAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        // 背景音乐
        backGroupSound: {
            default: null,
            type: cc.AudioClip
        },

        // 用于存放界面上的老鼠的数组
        _mouseIndexArr: [],

        // 音效是否循环播放
        // loop: true,
        // // 播放声音大小
        // soundVolume: {
        //     default: 1,
        //     range: [0,1,0.1],
        //     slide: true
        // },

        // 音效是否正在播放
        _isPlaying: false,
        // // 背景音乐的音频播放实例Id
        // _audioId: null,
        // // 游戏音效的音频播放实例的Id
        // _EffectId: null
    },

    // 初始化锤子事件(锤子移动事件)
    initEventListener() {
        console.log('debug1');
        // 当鼠标在目标节点区域中移动时，不论是否按下
        this.node.on(cc.Node.EventType.MOUSE_MOVE, function (event){
            this.onBeCreateHammerEvent(event.getLocation());
        },this);
        // 当手指在屏幕目标节点区域内移动时
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event){
            // console.log(event);
            this.onBeCreateHammerEvent(event.getLocation());
        },this);
        // 当手指触点落在目标节点区域内时
        this.node.on(cc.Node.EventType.TOUCH_START, function (event){
            this.onBeCreateHammerEvent(event.getLocation());
            this.onHammerClicked();
            if (this.gameRuleNode) {
                var gameRuleFadeOut = cc.fadeOut(1);
                this.gameRuleNode.runAction(gameRuleFadeOut);
            }
            this.node.getComponent("SoundManager").playSound("bgm", false, 1);
        },this);
        // 当手指在目标节点区域内离开屏幕时
        this.node.on(cc.Node.EventType.TOUCH_END, function (event){
            this.onHammerClicked();
        },this);
        
        for(let i = 0; i < this.mouseNodes.childrenCount; i++) {
            // 监听事件 当有一只地鼠动画结束时 就重新生成 cc.Animation.EventType.FINISHED === finished
            this.mouseNodes.children[i].getChildByName("Sp Mouse").getComponent(cc.Animation).on(cc.Animation.EventType.FINISHED, this.onAnimationFinishEvent, this);
        }
    },

    onBeCreateHammerEvent (position) {
        if (!this.hammerNode && !cc.isValid(this.hammerNode)) {
            this.hammerNode = cc.instantiate(this.hammer);
            this.hammerNode.zIndex = cc.macro.MAX_ZINDEX;
            this.hammerNode._isCollider = false;
            this.node.addChild(this.hammerNode);
        }
        this.hammerNode.position = this.node.convertToNodeSpaceAR(position);
    },

    onHammerClicked() {
        this.hammerNode.angle = this.hammerNode.angle === 0 ? 30 : 0;
    },

    // 初始化地鼠
    initMouseOutEvent() {
        if(this._mouseIndexArr.length === 0) {
            // mouseAmount等于1到9的随机数
            // this.mouseNodes.childrenCount 9个洞
            let mouseAmount = Math.floor((Math.random() * (this.mouseNodes.childrenCount - 1) + 1));
            if(mouseAmount === 0) {
                mouseAmount = 1;
            }
            for(let i = 0; i < mouseAmount; i++) {
                let randomNodeIndex = Math.floor(Math.random() * (this.mouseNodes.childrenCount));
                let randomSpriteFrameIndex = Math.floor(Math.random() * (this.animalAtlas.getSpriteFrames().length - 1));
                // _mouseIndexArr 用于存放目前有地鼠的小洞洞(打了就清除掉,没有老鼠就push进去)
                if(this._mouseIndexArr.indexOf(randomNodeIndex) === -1) {
                    let mouseNode = this.mouseNodes.children[randomNodeIndex].getChildByName("Sp Mouse");
                    // 在哪个地洞冒出来 使用哪种地鼠
                    // this.updateMouseNodeInfo(mouseNode, randomSpriteFrameIndex); 
                    mouseNode.getComponent(cc.BoxCollider).enabled = true;
                    this._mouseIndexArr.push(randomNodeIndex);
                    // console.log(this._mouseIndexArr);
                    mouseNode.getComponent(cc.Sprite).spriteFrame = this.animalAtlas.getSpriteFrames()[randomSpriteFrameIndex];
                    // 播放动画
                    mouseNode.getComponent(cc.Animation).play();
                }
            }
        }
    },

    // 重复让老鼠出现
    onAnimationFinishEvent() {
        // 去除数组的最后一个值
        this._mouseIndexArr.pop();
        this.initMouseOutEvent();

    },
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        // 初始化锤子
        this.initEventListener(); 
        // 初始化地鼠
        this.initMouseOutEvent();
    },

    // update (dt) {},
});

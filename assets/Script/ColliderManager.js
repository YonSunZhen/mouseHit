cc.Class({
    extends: cc.Component,

    // editor: {
    //     menu: "CustomComponent/CollisionManagement",
    // },

    properties: {
        _isCollider: false
    },

    onCollisionEnter (other, self) {
        // 先是锤子碰老鼠 this.node.group等于老鼠(cc.game.groupList[1])
        // 接着才是老鼠碰锤子 this.node.group等于锤子(cc.game.groupList[2])
        // console.log('debug1');
        // console.log(this.node.group);  
        if (this.node.group === cc.game.groupList[1]) {
            // this.node._isCollider = true;
            // this.gameComponent._mouseNode = this.node;
            console.log('已碰撞');
        }else if (this.node.group === cc.game.groupList[2]) {
            // console.log('debug3');
        }
    },
    onCollisionExit (other, self) {
        if (this.node.group === cc.game.groupList[1]) {
            // console.log('debug5');
            this.node._isCollider = false;
        }
        else if (this.node.group === cc.game.groupList[2]) {
            // console.log('debug6');
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // console.log('debug7');
        const colliderManager = cc.director.getCollisionManager();
        colliderManager.enabled = true;
    },

    start () {
        this.gameComponent = cc.director.getScene().getChildByName("Canvas").getComponent("Game");
    },

    // update (dt) {},
});

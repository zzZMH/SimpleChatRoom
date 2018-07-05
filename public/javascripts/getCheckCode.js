(function (window, document) {
    function CheckCode(option) {
        this.options = {
            id: "",
            canvasId: "checkCodeCanvas",
            width: "100",
            height: "30",
            type: "mix", //验证码类型：数字-number，字母-letter，混合-mix
            len: 5, //验证码长度
            codeVal: "" //验证码值
        };

        for (var i in option) {
            this.options[i] = option[i];
        }

        //获取数字
        this.options.numberArr = getNumberArr();

        //获取字母
        this.options.letterArr = getLetterArr();

        this._init();
    }

    CheckCode.prototype = {
        version: "1.0.0",
        _init: function () {
            if (!this.options.id || this.options.id == null || this.options.id == "") {
                return;
            }
            var cont = document.getElementById(this.options.id);
            if (document.getElementById(this.options.canvasId)) {//验证是否已经新建过canvas
                cont.innerHTML = "";
            }
            var canvas = document.createElement("canvas");//创建canvas
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            cont.appendChild(canvas);
            var _this = this;
            canvas.onclick = function () {
                _this._setCode(); //点击后刷新验证码值
            };
            _this._setCode();
        },
        _setCode: function () {
            var canvas = document.getElementById(this.options.canvasId);
            var ctx = canvas.getContext('2d');
            //绘制背景
            ctx.fillStyle = "rgba(208,240,223,1)";
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            var codeArr = [];
            this.options.codeVal = "";
            var codeType = this.options.type;
            if (codeType == "mix") { //混合型
                codeArr = this.options.numberArr.concat(this.options.letterArr);
            } else if (codeType == "number") { //数字型
                codeArr = this.options.numberArr;
            } else { //字母型
                codeArr = this.options.letterArr;
            }
            for (var i = 1; i <= this.options.len; i++) {
                var curCode = codeArr[getRandomNum(0, codeArr.length)]; //生成字
                this.options.codeVal += curCode;
                ctx.fillStyle = getRandomColor(0, 255, 1); //随机字体颜色
                var fontSize = getRandomNum(this.options.height * 0.5, this.options.height * 0.9); //随机字体大小
                ctx.font = fontSize + 'px sans-serif';
                //设置阴影
                ctx.shadowOffsetX = getRandomNum(-3, 3);
                ctx.shadowOffsetY = getRandomNum(-3, 3);
                ctx.shadowBlur = getRandomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
                var offX = this.options.width / (this.options.len + 1) * i * 0.9;
                var offY = this.options.height * 0.75;
                var offDeg = getRandomNum(-30, 30);
                ctx.translate(offX, offY);
                ctx.rotate(offDeg * Math.PI / 180);
                ctx.fillText(curCode, 0, 0);
                ctx.rotate(-offDeg * Math.PI / 180);
                ctx.translate(-offX, -offY);
            }
            for (var i = 0; i < this.options.len / 2; i++) {
                ctx.strokeStyle = getRandomColor(0, 255, 1);
                ctx.beginPath();
                ctx.moveTo(getRandomNum(0, this.options.width), getRandomNum(0, this.options.height));
                ctx.lineTo(getRandomNum(0, this.options.width), getRandomNum(0, this.options.height));
                ctx.stroke();
            }
            for (var i = 0; i < this.options.width / this.options.len; i++) {
                ctx.fillStyle = getRandomColor(0, 255, 1);
                ctx.beginPath();
                ctx.arc(getRandomNum(0, this.options.width), getRandomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    };

    function getNumberArr() {
        return "0,1,2,3,4,5,6,7,8,9".split(",");
    }

    function getLetterArr() {
        return "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
    }

    //获取随机数
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    //获取随机颜色，格式为rgba(0,0,0,0)
    function getRandomColor(min, max, a) {
        var r = getRandomNum(min, max);
        var g = getRandomNum(min, max);
        var b = getRandomNum(min, max);
        //防止与背景色重合
        if ("rgba(" + r + "," + g + "," + b + "," + a + ")" == "rgba(208,240,223,1)") {
            getRandomColor(min, max, a);
        }
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }

    window.CheckCode = CheckCode;

})(window, document);
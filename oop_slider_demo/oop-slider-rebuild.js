var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*  在定义基类的时候
    1- 我的理解是：在非class的编译环境下，所有的函数和变量都在同一个contest下面，所以可以相互调用；
    但是在class环境下，各个函数发生在不用的作用域。
    2- 定义的property不要赋值，所有的赋值放在constructor函数里
    3- 所有的函数用箭头函数在class里面是可行的！
    */
var Slider = /** @class */ (function () {
    function Slider(imgs, eleSlider, btnControl, eleIndicator, elePrevBtn, eleNextBtn, textPlay, textPause) {
        var _this = this;
        ////////////////////////
        /*setInterval在class里面的handler是一个回调函数，必须要用➡️函数链接另一个函数的接口，就是➡️函数里套用要用的回调函数。
          这里有一个非常重要的概念：函数的作用域！这里如果用普通的函数写法，系统会找不到handler指定的回调函数。
          上面讲到在class环境下，各个函数发生在不用的作用域，因为在内存里，setTimer函数和moveSlider函数发生在2个不同的作用域，
          普通函数必须用this.来调用，而setInterval里面的回调函数没有办法只用this.调用，
          这时就需要用到箭头函数来调用，因为只有➡️函数为没有作用域的问题，所以才能调用全局的变量和函数，而且这个回调函数必须包裹在箭头函数里面。
    
          *另外，在非class下，intervalID = setInterval(() => {this.moveSlider()}, 1000) 不需要写在函数里，但是在class下面，
          必须要用函数调用它*/
        this.setTimer = function () {
            _this.intervalID = setInterval(function () { _this.moveSlider(); }, 1000);
        };
        this.moveSlider = function () {
            if (_this.playing) {
                var imgIndex = ++_this.imgCount % _this.imgs.length;
                _this.eleSlider.setAttribute('src', _this.imgs[imgIndex]);
                var btn = document.getElementById(_this.indicatorPrefix + imgIndex);
                _this.clearHighlight();
                btn.setAttribute('class', 'dots highlightDots');
            }
        };
        this.clearHighlight = function () {
            for (var i = 0; i < _this.imgs.length; i++) {
                var btn = document.getElementById(_this.indicatorPrefix + i);
                btn.setAttribute('class', 'dots');
            }
        };
        ///////////////////////////////////
        this.startTimer = function () {
            if (!_this.intervalID) {
                _this.intervalID = setInterval(_this.moveSlider, 2000);
            }
        };
        this.stopTimer = function () {
            if (_this.intervalID) {
                clearInterval(_this.intervalID);
                _this.intervalID = null;
            }
        };
        ///////////////////////////////////
        this.createIndicators = function () {
            var _loop_1 = function (i) {
                var btn = document.createElement('button');
                _this.eleIndicator.appendChild(btn);
                //setAttribute永远都是qualifiedName + value：
                btn.setAttribute('data-btn', String(i)); //这一步是同步img和indicator的数字
                //下面这一行在class是没法执行的，所以onClickBtn（this）函数也没法用
                // btn.setAttribute('onclick', 'onClickBtn(this)')
                btn.setAttribute('id', _this.indicatorPrefix + i);
                btn.setAttribute('class', 'dots');
                // document.querySelectorAll('.dots')[i].addEventListener('click',()=>{console.log(this)})
                /*下面这部分就是用addEventListener函数给类添加事件的方法，和setAttribute添加事件的方法不一样，
                不需要在HTML里再去调用添加的函数，直接在listener里调用或者编译函数，但是这里由于涉及要用到createIndicators
                的参数"i"，但是i是createIndicators里面的参数，不是slider类的property，所以在使用的时候一定要用➡️函数调用，
                才可以消除作用域的问题，调用slider类里面的property和函数：
                */
                btn.addEventListener('click', function () {
                    _this.eleSlider.setAttribute('src', _this.imgs[i]);
                    var btn = document.getElementById(_this.indicatorPrefix + i);
                    _this.clearHighlight();
                    btn.setAttribute('class', 'dots highlightDots');
                    _this.imgCount = i; //让显示的图片顺序立刻跳到点击的indicator上，并且从下一幅图开始循环
                    //如果interval是运动的，就是ID有值的情况，先暂停计数，然后开始计数，这样点击每个图片，会按照setInterval的时间间隔从新循环
                    if (_this.intervalID) {
                        _this.stopTimer();
                        _this.startTimer();
                    }
                    else { //如果interval本身是停止的，就保持停止状态
                        _this.stopTimer();
                    }
                });
            };
            for (var i = 0; i < _this.imgs.length; i++) {
                _loop_1(i);
            }
        };
        ////////////////////////////////
        //下面的函数不能用，因为没法从creatorIndicators函数里找到点击indicator对应的数值
        // onClickBtn = (clickbtn) => {
        // debugger
        // let index: number = Number(clickbtn.getAttribute('data-btn'))
        // this.eleSlider.setAttribute('src', this.imgs[index])
        // let btn = document.getElementById(this.indicatorPrefix + index)
        // this.clearHighlight()
        // btn.setAttribute('class', 'dots highlightDots')
        //
        // this.imgCount = index //让显示的图片顺序立刻跳到点击的indicator上，并且从下一幅图开始循环
        // //如果interval是运动的，就是ID有值的情况，先暂停计数，然后开始计数，这样点击每个图片，会按照setInterval的时间间隔从新循环
        // if (this.intervalID) {
        //     this.stopTimer()
        //     this.startTimer()
        // } else {  //如果interval本身是停止的，就保持停止状态
        //     this.stopTimer()
        // }
        // }
        //////////////////////////////
        this.firstImg = function () {
            _this.eleSlider.setAttribute('src', _this.imgs[0]);
            var btn = document.getElementById(_this.indicatorPrefix + _this.imgCount);
            btn.setAttribute('class', 'dots highlightDots');
        };
        ////////////////////////////
        //下面这里添加的点击事件也是必须用addEventListener方法，然后调用需要的函数，或者直接在里面写需要的函数
        // pauseOrPlaySlider2 = () => {
        //     this.btnControl.addEventListener('click', this.pauseOrPlayFunction)
        // }
        //
        // pauseOrPlayFunction = () => {
        //     if (this.intervalID) {
        //         clearInterval(this.intervalID)
        //         this.intervalID = null
        //         this.btnControl.innerHTML = this.textPause
        //     } else {
        //         this.intervalID = setInterval(this.moveSlider, 1000)
        //         this.btnControl.innerHTML = this.textPlay
        //     }
        // }
        ////////////////////
        this.pauseOrPlaySlider2 = function () {
            _this.btnControl.addEventListener('click', function () {
                if (_this.intervalID) {
                    clearInterval(_this.intervalID);
                    _this.intervalID = null;
                    _this.btnControl.innerHTML = _this.textPause;
                }
                else {
                    _this.intervalID = setInterval(_this.moveSlider, 1000);
                    _this.btnControl.innerHTML = _this.textPlay;
                }
            });
        };
        //////////////////////////////////////////////////
        this.movePrevImages = function () {
            _this.elePrevBtn.addEventListener('click', _this.movePrevImagesFunction);
        };
        this.movePrevImagesFunction = function () {
            var index = --_this.imgCount % _this.imgs.length;
            if (index < 0) {
                index = _this.imgs.length - 1; //当往前遍历到第一张图片，再往前的时候，强制跳到最后一张图片
                _this.imgCount = index; //这一步很重要，这样153行的"--imgCount"不会一直减下去
            }
            _this.eleSlider.setAttribute('src', _this.imgs[index]);
            var btn = document.getElementById(_this.indicatorPrefix + index);
            _this.clearHighlight();
            btn.setAttribute('class', 'dots highlightDots');
            if (_this.intervalID) {
                _this.stopTimer();
                _this.startTimer();
            }
            else {
                _this.stopTimer();
            }
        };
        this.moveNextImages = function () {
            _this.eleNextBtn.addEventListener('click', _this.moveNextImagesFunction);
        };
        this.moveNextImagesFunction = function () {
            var index = ++_this.imgCount % _this.imgs.length;
            _this.eleSlider.setAttribute('src', _this.imgs[index]);
            var btn = document.getElementById(_this.indicatorPrefix + index);
            _this.clearHighlight();
            btn.setAttribute('class', 'dots highlightDots');
            if (_this.intervalID) {
                _this.stopTimer();
                _this.startTimer();
            }
            else {
                _this.stopTimer();
            }
        };
        this.moveImagesFunction = function () {
            // if (direction === 'next') {
            //     let index01 = ++this.imgCount % this.imgs.length
            //     this.eleSlider.setAttribute('src', this.imgs[index01])
            //     let btn = document.getElementById(this.indicatorPrefix + index01)
            //     this.clearHighlight()
            //     btn.setAttribute('class', 'dots highlightDots')
            //     if (this.intervalID) {
            //         this.stopTimer()
            //         this.startTimer()
            //     } else {
            //         this.stopTimer()
            //     }
            // } else if (direction === 'prev') {
            //     let index02 = --this.imgCount % this.imgs.length
            //     if (index02 < 0) {
            //         index02 = this.imgs.length - 1 //当往前遍历到第一张图片，再往前的时候，强制跳到最后一张图片
            //         this.imgCount = index02 //这一步很重要，这样153行的"--imgCount"不会一直减下去
            //     }
            //     this.eleSlider.setAttribute('src', this.imgs[index02])
            //     let btn = document.getElementById(this.indicatorPrefix + index02)
            //     this.clearHighlight()
            //     btn.setAttribute('class', 'dots highlightDots')
            //     if (this.intervalID) {
            //         this.stopTimer()
            //         this.startTimer()
            //     } else {
            //         this.stopTimer()
            //     }
            // }
        };
        this.imgs = imgs;
        this.eleSlider = eleSlider;
        this.btnControl = btnControl;
        this.eleIndicator = eleIndicator;
        this.elePrevBtn = elePrevBtn;
        this.eleNextBtn = eleNextBtn;
        this.textPlay = textPlay;
        this.textPause = textPause;
        //等于具体的值的变量都写在constructor参数里：
        this.imgCount = 0;
        this.playing = true;
        this.intervalID = null;
        this.indicatorPrefix = 'xbtn';
        // this.moveSlider = null
    }
    return Slider;
}());
var LandscapeSlider = /** @class */ (function (_super) {
    __extends(LandscapeSlider, _super);
    function LandscapeSlider(imgs, eleSlider, btnControl, eleIndicator, elePrevBtn, eleNextBtn, textPlay, textPause) {
        var _this = _super.call(this, imgs, eleSlider, btnControl, eleIndicator, elePrevBtn, eleNextBtn, textPlay, textPause) || this;
        // setTimer=()=>{
        //     this.intervalID = setInterval(this.moveSlider, 3000)
        // }
        // pauseOrPlaySlider2() {
        //     this.playing = !this.playing
        //     this.btnControl.innerHTML = this.playing ? this.textPlay : this.textPause
        // }
        _this.moveControlToEnd = function () {
            var node = document.getElementById('oobControl');
            var list = document.getElementById('oobIndicator');
            list.insertBefore(node, null);
        };
        return _this;
    }
    return LandscapeSlider;
}(Slider));
var thousandIslandsSlider = new LandscapeSlider(['https://previews.dropbox.com/p/thumb/AAfHKGmGV59rNeXLb7hjevj0aii_e9XupvvaN_ghxdWx7V4fKiw_LNXEbUsVvUBbMEGEjgE24htbUHy5_iU__LFXPDJKjyLj-CBUC4cFZ5CgnfVX--FfvOa7jsK0Ht53n244neD5OCrnUx1dAkiXpvyA1jKCgXt4biyMMrwpAkt3QwxpYisCfslPZXPVFU7iz7h4-aYFgm7Tod7fXt7ScRKXcIzVp8W-byaKUgqqGiNQZrTnRD0obHiseQYMUzGZbjoQsK7xYKSy4Hr-7n1tPiNgXSH7uxwY71KsRuUUF4VilhtndlV1RR1WeKvzHZpDOrcyG5R5gL4eI6_i293CdBuX/p.jpeg?fv_content=true&size_mode=5',
    'https://previews.dropbox.com/p/thumb/AAdwOLoMFKdpYzxs0IEz3Hv5qKU7IlA0W4JB5olOF7k43OwH-3gAbTImKoyLj3gQbIO_RrC1DCyKTGF9zFDL4M9GRFUTR9nUoLQVEPhwLJZyevxpvc-0PvloKiE0kHchB9RMBKoJe7RlQP8Sa89-Sat_vhc9B1zNT38eU_BdkZajEY1slRGOFsvCMrKug4hhQePs-eOBbFykBPENcuDpKH3MvEPjiqCWGeuZAwX5JKk5QVPPrPoUcKf-gA0myD9jL5BeK_tuQLTC77SqG7-2Jpv-AtU8a4aiBPgx4v9sOqkFVaLGAM0PV7S4o3qxssuumH4yj4Aheq3pcrQ_EMPHpQQ9/p.jpeg?fv_content=true&size_mode=5',
    'https://previews.dropbox.com/p/thumb/AAegNuOMR3NvfkPmgAk6ykyAOjAmAu9L2WbZIc93pk-TOooMpMC-GPvpoZA1uy04Fi_tmRTC-Oxocq7d-Yvi4N1OEGPsiOBnz9_PXfY8ClMcrmdy49MxnmXIaI9ypyr6reCIqdZGPhEoHzPpYOjzsWvWWXrz8VyIO9_BlrCkMZB4xDeHjsaf8Ox5SzbAitJA_3QobvZrQT9xr7drEouSOT-iMigLn6I5RCtJEnK5EYIVpys-Pq0jFvKzytaANM1j92pCMKFcFUeOwAWEWbYyfymeSF4H3sHG-PPX-CsOkhMJ4dyyclOUoXRVvhuHb3ETLiQEwILItx7SVSumUNMJM3K7/p.jpeg?fv_content=true&size_mode=5',
    'https://previews.dropbox.com/p/thumb/AAdpf5M87zyHw1FqEiNkaZR3bn-3wA_l_6SJDqzPRy8Sh_QgEi4tZFUfzTAxZCm97l5AwsLG8ZJZO4305ESZkbxFb7YpuNO9zNxGvYj_jh4TRayL_KoLd-rfmL29G2IONf0uSBUVQ_YIiBCjRlHvGZtS3oR1MpEPdhsSws9LX4yMyOJ4n4X1WKX3JA0ccNy5m4S33AR0sXkRuKVAT1ZzhgqgWYCfSdj8X80z2fm_qgcGO8g92Q_50X6PB-nGqITKzBSVwLym-e_KF1fF2TRrqOoxbhPc38QZbP0q28X8rXWiA9EAqwn7BeEphM_1h8LswNUiU8ElOHzlot7MacPyYVZu/p.jpeg?fv_content=true&size_mode=5',
    'https://previews.dropbox.com/p/thumb/AAe6RjDt4_bu3JaGWGBwSY3Y6abs_F_u4_A3cbWH0ZSHTql2T9Oq7_ZvWDWY7ogmH3aQiYtehlJcQMn-CpDbya19KH7KIcrz83oXjHiblbCLUIqdao6okMq-MKKfSoDepnnTfsA-gQ59zwKkCwnfYT6bYLjoLNFl3yxcZa7pPQK6NQz7IbV6tyoyQXaRkT3n-A1RLB9Hrynf8YXmFjO6Oy0BgGgncxytdhymMpBBCgen38UZ0jl9bfheoKv1xkI2FaRCv7F6B3zVtBHTJ1-nHU4cDcc_tAtBmqP4-d6Es_3Jw7Dav3vviMceGJMsECyLjlaWHRedzTzUAf2_BHdwkn5P/p.jpeg?fv_content=true&size_mode=5',
    'https://previews.dropbox.com/p/thumb/AAfQQie6zGavk9U3K21txgUh9VrzOJBZU8uuzy6AKjuS-s2_kXp91MP09wd_0xgIADC5Wt2rY29C1wMtcx60QkIBHVhBapDtItoAHoW-0wkOuJFKGaJgKXhy3FGvSbYbiUbTorHZmeXoYjVPzaMCIZetC6ao__YX06ALvhtS3aegraNiaEaPqJT3W0ppUPWZacCnDS2UfzZumuIQkJXMLYupZ_P-Jwe9H1mm8AQCVP8VJfALTDQSLiIFG8oYZsrhWFpF3u8AEyCYd0UX838sB2Bfj-7errDsb12n8-Qk741lnTpHE_4UVuuwg9iQfU42R5t783kNJC9xDF9e0KjMqBGN/p.jpeg?fv_content=true&size_mode=5'], document.getElementById('oobSlider'), document.getElementById('oobControl'), document.getElementById('oobIndicator'), document.getElementById('oobPrevBtn'), document.getElementById('oobNextBtn'), '<i class="fas fa-pause"></i>', '<i class="fas fa-play"></i>');
thousandIslandsSlider.setTimer();
thousandIslandsSlider.createIndicators();
thousandIslandsSlider.firstImg();
thousandIslandsSlider.pauseOrPlaySlider2();
thousandIslandsSlider.movePrevImages();
thousandIslandsSlider.moveNextImages();
thousandIslandsSlider.moveControlToEnd();
//# sourceMappingURL=oob-slider-rebuild.js.map
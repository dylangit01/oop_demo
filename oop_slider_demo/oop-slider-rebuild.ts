/*  在定义基类的时候
    1- 我的理解是：在非class的编译环境下，所有的函数和变量都在同一个contest下面，所以可以相互调用；
    但是在class环境下，各个函数发生在不用的作用域。
    2- 定义的property不要赋值，所有的赋值放在constructor函数里
    3- 所有的函数用箭头函数在class里面是可行的！
    */
class Slider {
    imgs: string[]=[] ;
    imgCount: number;
    eleSlider: HTMLImageElement; //这行指代HTML里面图片的ID
    btnControl: HTMLButtonElement; //这行指代HTML里面停止按钮的ID
    eleIndicator: HTMLDivElement; //这行指代HTML里面indicator所在DIV的ID
    elePrevBtn: HTMLButtonElement; //这行指代HTML里面向前翻图片的button的ID
    eleNextBtn: HTMLButtonElement; //这行指代HTML里面向后翻图片的button的ID

    playing: boolean;
    //下面两行指代的是暂停和播放按钮的样式，都是可以在构造函数里自定义
    textPlay: string;
    textPause: string;

    // moveSlider: Function;

    intervalID: number;
    indicatorPrefix: string;

    constructor(imgs: string[], eleSlider: HTMLImageElement, btnControl: HTMLButtonElement,
                eleIndicator: HTMLDivElement, elePrevBtn: HTMLButtonElement, eleNextBtn: HTMLButtonElement,
                textPlay: string, textPause: string,) {
        this.imgs = imgs
        this.eleSlider = eleSlider
        this.btnControl = btnControl
        this.eleIndicator = eleIndicator
        this.elePrevBtn = elePrevBtn
        this.eleNextBtn = eleNextBtn
        this.textPlay = textPlay
        this.textPause = textPause
        //等于具体的值的变量都写在constructor参数里：
        this.imgCount = 0
        this.playing = true
        this.intervalID = null
        this.indicatorPrefix = 'xbtn'
        // this.moveSlider = null
    }

    ////////////////////////
    /*setInterval在class里面的handler是一个回调函数，必须要用➡️函数链接另一个函数的接口，就是➡️函数里套用要用的回调函数。
      这里有一个非常重要的概念：函数的作用域！这里如果用普通的函数写法，系统会找不到handler指定的回调函数。
      上面讲到在class环境下，各个函数发生在不用的作用域，因为在内存里，setTimer函数和moveSlider函数发生在2个不同的作用域，
      普通函数必须用this.来调用，而setInterval里面的回调函数没有办法只用this.调用，
      这时就需要用到箭头函数来调用，因为只有➡️函数为没有作用域的问题，所以才能调用全局的变量和函数，而且这个回调函数必须包裹在箭头函数里面。

      *另外，在非class下，intervalID = setInterval(() => {this.moveSlider()}, 1000) 不需要写在函数里，但是在class下面，
      必须要用函数调用它*/

    setTimer = () => {
        this.intervalID = setInterval(() => {this.moveSlider()}, 1000)
    }

    moveSlider = () => {
        if (this.playing) {
            let imgIndex = ++this.imgCount % this.imgs.length

            /*下面是第二种图片循环的方法，但是这个方法是在没有前进或者后退的按钮的时候可以使用，
            但是一旦有前进按钮功能，++imgCount会持续计数大于imgs.length，这样计数会立刻变0，
            显示的图片会从当前图片立刻跳到第一幅图片，所以这个方法没有求余的方法好
            */
            // let imgIndex = ++this.imgCount
            // if (this.imgCount === this.imgs.length || this.imgCount > this.imgs.length ){
            //     this.imgCount = 0
            //     imgIndex = this.imgCount
            // }

            this.eleSlider.setAttribute('src', this.imgs[imgIndex])
            let btn = document.getElementById(this.indicatorPrefix + imgIndex)
            this.clearHighlight()
            btn.setAttribute('class', 'dots highlightDots')
        }
    }

    clearHighlight = () => {
        for (let i = 0; i < this.imgs.length; i++) {
            let btn = document.getElementById(this.indicatorPrefix + i)
            btn.setAttribute('class', 'dots')
        }
    }

    ///////////////////////////////////
    startTimer = () => {
        if (!this.intervalID) {
            this.intervalID = setInterval(this.moveSlider, 2000)
        }
    }

    stopTimer = () => {
        if (this.intervalID) {
            clearInterval(this.intervalID)
            this.intervalID = null
        }
    }
    ///////////////////////////////////
    createIndicators = () => {
        for (let i = 0; i < this.imgs.length; i++) {
            let btn: HTMLButtonElement = document.createElement('button')
            this.eleIndicator.appendChild(btn)
            //setAttribute永远都是qualifiedName + value：
            btn.setAttribute('data-btn', String(i)) //这一步是同步img和indicator的数字
            //下面这一行在class是没法执行的，所以onClickBtn（this）函数也没法用
            // btn.setAttribute('onclick', 'onClickBtn(this)')
            btn.setAttribute('id', this.indicatorPrefix + i)
            btn.setAttribute('class', 'dots')
            // document.querySelectorAll('.dots')[i].addEventListener('click',()=>{console.log(this)})

            /*下面这部分就是用addEventListener函数给类添加事件的方法，和setAttribute添加事件的方法不一样，
            不需要在HTML里再去调用添加的函数，直接在listener里调用或者编译函数，但是这里由于涉及要用到createIndicators
            的参数"i"，但是i是createIndicators里面的参数，不是slider类的property，所以在使用的时候一定要用➡️函数调用，
            才可以消除作用域的问题，调用slider类里面的property和函数：
            */
            btn.addEventListener('click', () => {
                this.eleSlider.setAttribute('src', this.imgs[i])
                let btn = document.getElementById(this.indicatorPrefix + i)
                this.clearHighlight()
                btn.setAttribute('class', 'dots highlightDots')

                this.imgCount = i //让显示的图片顺序立刻跳到点击的indicator上，并且从下一幅图开始循环
                //如果interval是运动的，就是ID有值的情况，先暂停计数，然后开始计数，这样点击每个图片，会按照setInterval的时间间隔从新循环
                if (this.intervalID) {
                    this.stopTimer()
                    this.startTimer()
                } else {  //如果interval本身是停止的，就保持停止状态
                    this.stopTimer()
                }
            })
            // let indiID = document.getElementById(this.indicatorPrefix + i)
            // console.log(indiID)
            // indiID.addEventListener('click', this.onClickBtn)
        }
    }
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
    firstImg = () => {
        this.eleSlider.setAttribute('src', this.imgs[0])
        let btn = document.getElementById(this.indicatorPrefix + this.imgCount)
        btn.setAttribute('class', 'dots highlightDots')
    }

    ////////////////////////////
    //下面这里添加的点击事件也是必须用addEventListener方法，然后调用需要的函数，或者直接在里面写需要的函数
    pauseOrPlaySlider2 = () => {
        this.btnControl.addEventListener('click', () => {
                if (this.intervalID) {
                    clearInterval(this.intervalID)
                    this.intervalID = null
                    this.btnControl.innerHTML = this.textPause
                } else {
                    this.intervalID = setInterval(this.moveSlider, 1000)
                    this.btnControl.innerHTML = this.textPlay
                }
            }
        )
    }

    /////////////////////////////////
    // pauseOrPlaySlider2 = () => {
    // this.btnControl.addEventListener('click', this.pauseOrPlayFunction)
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

//////////////////////////////////////////////////
    movePrevImages = () => {
        this.elePrevBtn.addEventListener('click', () => {
            let index = --this.imgCount % this.imgs.length
            if (index < 0) {
                index = this.imgs.length - 1 //当往前遍历到第一张图片，再往前的时候，强制跳到最后一张图片
                this.imgCount = index //这一步很重要，这样153行的"--imgCount"不会一直减下去
            }
            this.eleSlider.setAttribute('src', this.imgs[index])
            let btn = document.getElementById(this.indicatorPrefix + index)
            this.clearHighlight()
            btn.setAttribute('class', 'dots highlightDots')
            if (this.intervalID) {
                this.stopTimer()
                this.startTimer()
            } else {
                this.stopTimer()
            }
        })
    }

    moveNextImages = () => {
        this.eleNextBtn.addEventListener('click', this.moveNextImagesFunction)
    }

    moveNextImagesFunction = () => {
        let index = ++this.imgCount % this.imgs.length
        this.eleSlider.setAttribute('src', this.imgs[index])
        let btn = document.getElementById(this.indicatorPrefix + index)
        this.clearHighlight()
        btn.setAttribute('class', 'dots highlightDots')
        if (this.intervalID) {
            this.stopTimer()
            this.startTimer()
        } else {
            this.stopTimer()
        }
    }

    // moveImages = () => {
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
}

class LandscapeSlider extends Slider {
    constructor(imgs: string[], eleSlider: HTMLImageElement, btnControl: HTMLButtonElement,
                eleIndicator: HTMLDivElement, elePrevBtn: HTMLButtonElement, eleNextBtn: HTMLButtonElement,
                textPlay: string, textPause: string,) {
        super(imgs, eleSlider, btnControl, eleIndicator, elePrevBtn, eleNextBtn, textPlay, textPause)
    }

    // setTimer=()=>{
    //     this.intervalID = setInterval(this.moveSlider, 3000)
    // }

    // pauseOrPlaySlider2() {
    //     this.playing = !this.playing
    //     this.btnControl.innerHTML = this.playing ? this.textPlay : this.textPause
    // }

    //下面这个函数是自定义把control按钮放到indicators的后面，其实是可以写在slider类里面的，但是又会多出两个properties
    moveControlToEnd = () => {
        let node = document.getElementById('oobControl')
        let list = document.getElementById('oobIndicator')
        list.insertBefore(node, null)
    }

}

let thousandIslandsSlider = new LandscapeSlider(['https://previews.dropbox.com/p/thumb/AAfHKGmGV59rNeXLb7hjevj0aii_e9XupvvaN_ghxdWx7V4fKiw_LNXEbUsVvUBbMEGEjgE24htbUHy5_iU__LFXPDJKjyLj-CBUC4cFZ5CgnfVX--FfvOa7jsK0Ht53n244neD5OCrnUx1dAkiXpvyA1jKCgXt4biyMMrwpAkt3QwxpYisCfslPZXPVFU7iz7h4-aYFgm7Tod7fXt7ScRKXcIzVp8W-byaKUgqqGiNQZrTnRD0obHiseQYMUzGZbjoQsK7xYKSy4Hr-7n1tPiNgXSH7uxwY71KsRuUUF4VilhtndlV1RR1WeKvzHZpDOrcyG5R5gL4eI6_i293CdBuX/p.jpeg?fv_content=true&size_mode=5',
        'https://previews.dropbox.com/p/thumb/AAdwOLoMFKdpYzxs0IEz3Hv5qKU7IlA0W4JB5olOF7k43OwH-3gAbTImKoyLj3gQbIO_RrC1DCyKTGF9zFDL4M9GRFUTR9nUoLQVEPhwLJZyevxpvc-0PvloKiE0kHchB9RMBKoJe7RlQP8Sa89-Sat_vhc9B1zNT38eU_BdkZajEY1slRGOFsvCMrKug4hhQePs-eOBbFykBPENcuDpKH3MvEPjiqCWGeuZAwX5JKk5QVPPrPoUcKf-gA0myD9jL5BeK_tuQLTC77SqG7-2Jpv-AtU8a4aiBPgx4v9sOqkFVaLGAM0PV7S4o3qxssuumH4yj4Aheq3pcrQ_EMPHpQQ9/p.jpeg?fv_content=true&size_mode=5',
        'https://previews.dropbox.com/p/thumb/AAegNuOMR3NvfkPmgAk6ykyAOjAmAu9L2WbZIc93pk-TOooMpMC-GPvpoZA1uy04Fi_tmRTC-Oxocq7d-Yvi4N1OEGPsiOBnz9_PXfY8ClMcrmdy49MxnmXIaI9ypyr6reCIqdZGPhEoHzPpYOjzsWvWWXrz8VyIO9_BlrCkMZB4xDeHjsaf8Ox5SzbAitJA_3QobvZrQT9xr7drEouSOT-iMigLn6I5RCtJEnK5EYIVpys-Pq0jFvKzytaANM1j92pCMKFcFUeOwAWEWbYyfymeSF4H3sHG-PPX-CsOkhMJ4dyyclOUoXRVvhuHb3ETLiQEwILItx7SVSumUNMJM3K7/p.jpeg?fv_content=true&size_mode=5',
        'https://previews.dropbox.com/p/thumb/AAdpf5M87zyHw1FqEiNkaZR3bn-3wA_l_6SJDqzPRy8Sh_QgEi4tZFUfzTAxZCm97l5AwsLG8ZJZO4305ESZkbxFb7YpuNO9zNxGvYj_jh4TRayL_KoLd-rfmL29G2IONf0uSBUVQ_YIiBCjRlHvGZtS3oR1MpEPdhsSws9LX4yMyOJ4n4X1WKX3JA0ccNy5m4S33AR0sXkRuKVAT1ZzhgqgWYCfSdj8X80z2fm_qgcGO8g92Q_50X6PB-nGqITKzBSVwLym-e_KF1fF2TRrqOoxbhPc38QZbP0q28X8rXWiA9EAqwn7BeEphM_1h8LswNUiU8ElOHzlot7MacPyYVZu/p.jpeg?fv_content=true&size_mode=5',
        'https://previews.dropbox.com/p/thumb/AAe6RjDt4_bu3JaGWGBwSY3Y6abs_F_u4_A3cbWH0ZSHTql2T9Oq7_ZvWDWY7ogmH3aQiYtehlJcQMn-CpDbya19KH7KIcrz83oXjHiblbCLUIqdao6okMq-MKKfSoDepnnTfsA-gQ59zwKkCwnfYT6bYLjoLNFl3yxcZa7pPQK6NQz7IbV6tyoyQXaRkT3n-A1RLB9Hrynf8YXmFjO6Oy0BgGgncxytdhymMpBBCgen38UZ0jl9bfheoKv1xkI2FaRCv7F6B3zVtBHTJ1-nHU4cDcc_tAtBmqP4-d6Es_3Jw7Dav3vviMceGJMsECyLjlaWHRedzTzUAf2_BHdwkn5P/p.jpeg?fv_content=true&size_mode=5',
        'https://previews.dropbox.com/p/thumb/AAfQQie6zGavk9U3K21txgUh9VrzOJBZU8uuzy6AKjuS-s2_kXp91MP09wd_0xgIADC5Wt2rY29C1wMtcx60QkIBHVhBapDtItoAHoW-0wkOuJFKGaJgKXhy3FGvSbYbiUbTorHZmeXoYjVPzaMCIZetC6ao__YX06ALvhtS3aegraNiaEaPqJT3W0ppUPWZacCnDS2UfzZumuIQkJXMLYupZ_P-Jwe9H1mm8AQCVP8VJfALTDQSLiIFG8oYZsrhWFpF3u8AEyCYd0UX838sB2Bfj-7errDsb12n8-Qk741lnTpHE_4UVuuwg9iQfU42R5t783kNJC9xDF9e0KjMqBGN/p.jpeg?fv_content=true&size_mode=5'],
    <HTMLImageElement>document.getElementById('oobSlider'), <HTMLButtonElement>document.getElementById('oobControl'), <HTMLDivElement>document.getElementById('oobIndicator'), <HTMLButtonElement>document.getElementById('oobPrevBtn'), <HTMLButtonElement>document.getElementById('oobNextBtn'),
    '<i class="fas fa-pause"></i>', '<i class="fas fa-play"></i>')

//由于上面用了addEventListener函数，所有在HTML里面加onClick事件的函数都取消了，所以必须在下面应用
thousandIslandsSlider.setTimer()
thousandIslandsSlider.createIndicators()
thousandIslandsSlider.firstImg()
thousandIslandsSlider.pauseOrPlaySlider2()
thousandIslandsSlider.movePrevImages()
thousandIslandsSlider.moveNextImages()
thousandIslandsSlider.moveControlToEnd()

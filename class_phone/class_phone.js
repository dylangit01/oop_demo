//OOP 三大属性
// #1：encapsulation 封装
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
//类名最好要大写：
var Cellphone = /** @class */ (function () {
    function Cellphone(brd, col, OS, seNum) {
        this.brand = brd;
        this.color = col;
        this.OS = OS;
        this.ROM = '128G';
        this.RAM = '8G';
        this.serialNum = seNum;
    }
    Cellphone.prototype.call = function () {
        console.log('I am calling...');
    };
    Cellphone.prototype.takingPic = function (cameraPixel) {
        console.log('This phone has ' + cameraPixel + ' Pixel');
    };
    //如何在class里面套用函数？
    Cellphone.prototype.calculator = function (a, b, operator) {
        if (operator === 'add') {
            console.log(a + b);
            return a + b;
        }
        else if (operator === 'minus') {
            console.log(a - b);
            return a - b;
        }
        else if (operator === 'multiply') {
            console.log(a * b);
            return a * b;
        }
        else if (operator === 'divide') {
            console.log(a / b);
            return a / b;
        }
        else if (operator === 'mod') {
            console.log(a % b);
            return a % b;
        }
    };
    Cellphone.prototype.selfCheckStatus = function () {
        console.log('Starting self checking');
    };
    return Cellphone;
}());
// let aPhone: Cellphone = new Cellphone('Huawei', 'Black', 'Hongmeng', '#123456789')
//
// aPhone.call()
// aPhone.takingPic(45)
// aPhone.calculator(13, 24, 'add')
//
// let gPhones: Cellphone[] = []
// let seCount: number = 0
//
// for (let i = 0; i < 100; i++) {
//     let bPhone: Cellphone = new Cellphone('Huawei', 'Black', 'Hongmeng', '#00000' + seCount++)
//     gPhones.push(bPhone)
// }
// console.log(gPhones)
// OOP 第二大属性：inheritance 继承
var XPhone = /** @class */ (function (_super) {
    __extends(XPhone, _super);
    function XPhone(brd, col, OS, seNum, folding) {
        if (folding === void 0) { folding = true; }
        var _this = _super.call(this, brd, col, OS, seNum) || this;
        _this.foldable = folding;
        return _this;
    }
    XPhone.prototype.games = function () {
        console.log('wangzherongyao', 'dungeon chronicle');
    };
    XPhone.prototype.playGame = function () {
        this.games();
        this.selfCheckStatus();
        console.log('playing these games');
    };
    return XPhone;
}(Cellphone));
var xPhone1 = new XPhone('xPhone1', 'red', 'ios', '#1000001', false); //这里怎么变成颜色了？
console.log(xPhone1);
xPhone1.takingPic(45);
xPhone1.playGame();
xPhone1.
;

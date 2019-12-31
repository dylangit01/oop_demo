//OOP 三大属性
// #1：encapsulation 封装

//类名最好要大写：
class Cellphone {

    brand: string;
    OS: string; //这里如何只定义某几个类型的O？只能在constructor函数里去定义
    displaySize: number;
    color: string;
    batteryCapacity: number;
    Camera: boolean;
    ROM: string;
    RAM: string;
    language: string;
    'SIM-quantity': number;
    ReleaseDate: Date;
    serialNum: string;

    constructor(brd: string, col: string, OS: 'Android' | 'ios' | 'Hongmeng', seNum: string) {
        this.brand = brd
        this.color = col
        this.OS = OS
        this.ROM = '128G'
        this.RAM = '8G'
        this.serialNum = seNum
    }

    call() {
        console.log('I am calling...')
    }

    takingPic(cameraPixel: number) {
        console.log('This phone has ' + cameraPixel + ' Pixel')
    }

    //如何在class里面套用函数？
    calculator(a: number, b: number, operator: string) {
        if (operator === 'add') {
            console.log(a + b)
            return a + b
        } else if (operator === 'minus') {
            console.log(a - b)
            return a - b
        } else if (operator === 'multiply') {
            console.log(a * b)
            return a * b
        } else if (operator === 'divide') {
            console.log(a / b)
            return a / b
        } else if (operator === 'mod') {
            console.log(a % b)
            return a % b
        }
    }

    protected selfCheckStatus(){
        console.log('Starting self checking')
    }

}
//OOP 第一个属性的实例：
let aPhone: Cellphone = new Cellphone('Huawei', 'Black', 'Hongmeng', '#123456789')

aPhone.call()
aPhone.takingPic(45)
aPhone.calculator(13, 24, 'add')

let gPhones: Cellphone[] = []//这里很重要：初始化gPhones的类型和"值-->[]一个空的数列"
let seCount: number = 0

for (let i = 0; i < 100; i++) {
    let bPhone: Cellphone = new Cellphone('Huawei', 'Black', 'Hongmeng', '#00000' + seCount++)
    gPhones.push(bPhone)
}
console.log(gPhones)

// OOP 第二大属性：inheritance 继承
class XPhone extends Cellphone {
    foldable:boolean

    constructor(brd:string, col:string, OS:'ios'|'Android'|'Hongmeng', seNum:string,folding:boolean = true){ //这里的作用是函数的默认值，就是在下面81行，如果不写folding的值的话，就默认为true，如果不一样，就取不一样的值
        super (brd, col, OS, seNum)
        this.foldable = folding
    }

    games(){
        console.log('wangzherongyao', 'dungeon chronicle')
    }

    playGame(){
        this.games()
        this.selfCheckStatus()
        console.log('playing these games')
    }

}
let xPhone1 = new XPhone('xPhone1', 'red','ios','#1000001',false)//这里怎么变成颜色了？
console.log(xPhone1)

xPhone1.takingPic(45)
xPhone1.playGame()























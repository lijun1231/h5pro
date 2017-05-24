/**
 * Created by Administrator on 2016/7/5.
 */
class Main2 {
    constructor (name) {
        this.name = name || 'user';
    }
    getName () {
        return this.name;
    }
    setName (newName) {
        this.name = newName;
    }
};

// 生成随机串
let createRandomAlphaNum = function (len) {
    let rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2)) {
    }
    return rdmString.substr(0, len);
};
// 排序
let sr = {
    bubbling(a) {
        for (let i = a.length; i > 0; i--) {//比较的次数
            for (let j = 0; j < i; j++) {
                if (a[j] > a[j + 1]) {
                    a[j]=a[j]+a[j+1];
                    a[j+1]=a[j]-a[j+1];
                    a[j]=a[j]-a[j+1];
                }
            }
        }
        return a;
    },
    quickSort(arr) {
        if(arr.length<=1){return arr;}
        let left=[],right=[];
        let pInd=~~(arr.length/2);
        let p=arr.splice(pInd,1)[0];
        for(let i=0;i<arr.length;i++){
            let v=arr[i];
            if(v>p){
                right.push(v);
            }else{
                left.push(v);
            }
        }
        return this.quickSort(left).concat([p],this.quickSort(right));
    },
};


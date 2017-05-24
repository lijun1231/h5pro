/**
 * Created by junli on 2016/12/15.
 */
define(function(){
    const sort = (arr, lt) => { // 插入排序做个例子，可以换其他效率高的
        const len = arr.length;
        if (len === 1) return arr;
        for (let i = 1; i < len; i++) {
            let j = i;
            while ((j > 0) && lt(arr[j], arr[j - 1])) { // j < j-1
                const jj = arr[j];
                const jj1 = arr[j - 1];
                arr[j] = jj1;
                arr[j - 1] = jj;
                j -= 1;
            }
        }
        return arr;
    }
    const msort = (arr, ...lts) => {
        let len = lts.length;
        let x = arr;
        while (len--) {
            x = sort(arr, lts[len]);
        }
        return x;
    };
    const sarr = msort(arr,
        ((a, b) => a.credit > b.credit), // 降序
        ((a, b) => Number(a.detail.price.substr(1)) < Number(b.detail.price.substr(1))), // 升序
        ((a, b) => a.detail.likes > b.detail.likes) // 降序
    );
    console.log(sarr);
})
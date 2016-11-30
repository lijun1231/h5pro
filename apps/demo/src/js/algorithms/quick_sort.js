/**
 * Created by Administrator on 2016/10/25.
 */
define(function(){
    var quickSort=(arr)=>{
        if(arr.length<=1){return arr;}
        var left=[],right=[];
        var pInd=~~(arr.length/2);
        var p=arr.splice(pInd,1)[0];
        for(var i=0;i<arr.length;i++){
            var v=arr[i];
            if(v>p){
                right.push(v);
            }else{
                left.push(v);
            }
        }
        return quickSort(left).concat([p],quickSort(right));
    };
    return quickSort
});
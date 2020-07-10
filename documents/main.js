/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  //if x <= arr[0] 数组的前k个数
  //x>=arr[last] 数组的后k个数
  //二分查找
  let left = 0;
  let right = arr.length - 1;
  let res = [];
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (arr[mid] === x) {
      left = mid;
      right = mid + 1;
      break;
    } else if (arr[mid] < x) {
      left = mid;
    } else {
      right = mid;
    }
  }
  // console.log('left,right:', left, right);
  while (k > 0) {
    if ((x - arr[left]) <= (arr[right] - x)) {
      if (left < 0) {
        res.push(arr[right++])
      } else {
        res.unshift(arr[left--])
      }
    }else{
      if(right >= arr.length){
        res.unshift(arr[left--]);
      }else{
        res.push(arr[right++]);
      }
    }
    k--;
  }
  return res;

};
// [1,2,3,4,5], k=4, x=3
// let nums = [1, 2, 3, 4, 5]
let nums = [1,2,2,2,5,5,5,8,9,9]
console.log(findClosestElements(nums, 4, 0));

var findClosestElements2 = function (arr,k,x) {
  arr.sort( (a,b) => {
    // console.log(a,b);
   return  Math.abs( a-x) - Math.abs(b-x)
  })
  let res = arr.slice(0,k);
  console.log(res);
  res.sort( (a,b) => a-b);
  return res;
}
console.log(findClosestElements2(nums,4,5)); 


var findClosestElements3 = function (arr,k,x) {
  let n = arr.length;
  if(n === 0){
    return [];
  }
  if(x <= arr[0]){
    return arr.slice(0,k);
  }else if(x >= arr[n-1]){
    return arr.slice(n-k,n);
  }else{

  }
}
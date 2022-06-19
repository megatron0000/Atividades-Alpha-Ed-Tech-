let ans = document.querySelector("#ans");
let btn = document.querySelector("#btn");

btn.addEventListener('click', function() {

  let obj = {};
  obj['value of'] = 1;

  console.log(obj["value of"]);
  console.log(Object.keys(obj));
  
  Object.defineProperties(obj, {'value of': { value: 10, writable: true}});

  console.log(obj["value of"]);
});


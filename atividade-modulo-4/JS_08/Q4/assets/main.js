let ans = document.querySelector("#ans");
let btn = document.querySelector("#btn");

btn.addEventListener('click', function() {

    try {
        let jsonObj = JSON.parse(ans.value);
        alert("Parseble JSON string!");
        console.log(jsonObj);
    } catch (err) {
        alert(err)
    }
});
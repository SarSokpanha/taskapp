fetch("category.json")
.then(response => response.json())
.then(json => 
json.forEach(cat => {
    //console.log(cat.title);
}));
let CatUL = document.querySelector(".category ul");

categories = document.querySelector(".category ul")
document.addEventListener("DOMContentLoaded", () => {

    fetch("category.json")
    .then(response => response.json())
    .then(json => 
    json.forEach(cat => {
        let LI = document.createElement('LI');
        LI.setAttribute("onclick",`filter_task('${cat.title}')`);
        LI.innerHTML=GenerateCatLi(cat);
        CatUL.appendChild(LI);

}));
});
    // --- Add new Cat ---//
    btnAddNewCat = document.querySelector(".add-new-cat")
    btnAddNewCat.addEventListener("click", function (e){
        let newCatLI = document.createElement("LI");
        newCatLI.innerHTML = `<div class="space">
        <span class="inline-icon material-symbols-outlined">home</span>
        <input type="text">
        </div>`;
        categories.appendChild(newCatLI);
        let newCatInpt= newCatLI.querySelector("input");
        newCatInpt.focus();
    });
function GenerateCatLi (cat){
    let li = `
    <div class="space">
    <span><span class="inline-icon material-symbols-outlined">${cat.icon}</span>${cat.title}</span>
                        <span class="badge">${cat.num}</span></div>`;
    return li;
}
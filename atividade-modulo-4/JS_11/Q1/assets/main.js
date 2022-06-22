
const name_ = document.querySelector("#name");
const desc_ = document.querySelector("#description");
const value_ = document.querySelector("#value");
const ans = document.querySelector("h2");
const send = document.querySelector("#send");
const list = document.querySelector("#list");
let table = document.createElement("TABLE");
table.setAttribute('id', 'tb');


send.addEventListener('click', save);
list.addEventListener('click', listAll);

let products = [];
let id_ = 0;
let editId = 0;

function save() {

        try {

            if(send.textContent === "Cadastrar"){
                // // name_.value = "teste";
                // // desc_.value = "teste desc...";
                // // value_.value = 120.00;

                // if (name_.value === "" || desc_.value === "" || value_.value === "") {
                //     throw alert(`Falha no cadastro do produto!`);
                // } else if (isNaN(value_.value)) {
                //     throw alert(`Digite apenas numeros`);
                // }

                // let obj = {
                //     id: id_++,
                //     name: name_.value,
                //     desc: desc_.value,
                //     value: value_.value,
                //     incluidoEm: new Date().getTime()
                // }

                // products.push(obj);
                // alert(`Produto ${obj.name} incluído com sucesso!`);

                products.push({
                    id: id_++,
                        name: "zebra",
                        desc: "321",
                        value: parseFloat(30),
                        incluidoEm: new Date().getTime()
                });

                products.push({
                    id: id_++,
                        name: "pedra",
                        desc: "123",
                        value: parseFloat(300),
                        incluidoEm: new Date().getTime()
                });

                products.push({
                    id: id_++,
                        name: "vidro",
                        desc: "80",
                        value: parseFloat(1300),
                        incluidoEm: new Date().getTime()
                });

                products.push({
                    id: id_++,
                        name: "borda",
                        desc: "123",
                        value: parseFloat(3),
                        incluidoEm: new Date().getTime()
                });

                products.push({
                    id: id_++,
                        name: "azul",
                        desc: "123",
                        value: parseFloat(65),
                        incluidoEm: new Date().getTime()
                });
            }

            else if(send.textContent === "Editar"){
                products[editId].name = name_.value,
                products[editId].desc = desc_.value,
                products[editId].value = value_.value,
                products[editId].incluidoEm = new Date().getTime()

                send.textContent = "Cadastrar";
            }

            name_.value = "";
            desc_.value = "";
            value_.value = "";

            //listAll();
    
        } catch (error) {
            alert(error);
        }
    
}

function listAll() {
    // let i = 0;
    // while(i <= (products.length - 1)){
    //     console.log(products[i]);
    //     i++;
    // }

    createTable();
}

function createTable(){

    deleteTable();

    let headers = ["ID", "Nome", "Preço", "EDITAR", "DELETAR"];

    for(let i = 0; i < products.length; i++) {

        const row = table.insertRow(i);
        row.insertCell(0).innerHTML =  `<span> ${products[i].id} </span>`;
        row.insertCell(1).innerHTML = `<span onclick="select(${i})"> ${products[i].name} </span>`;
        row.insertCell(2).innerHTML = `<span> ${products[i].value} </span>`;
        row.insertCell(3).innerHTML =  `<span onclick="edit(${i})" class="material-icons">edit</span>`; 
        row.insertCell(4).innerHTML =  `<span onclick="deleteItem(${i})" class="material-icons">delete</span>`;
    }

    let header = table.createTHead();
    let headerRow = header.insertRow(0);

    headerRow.insertCell(0).innerHTML = `<span"> ${headers[0]} </span>`;
    headerRow.insertCell(1).innerHTML = `<span onclick="sortName()"> ${headers[1]} </span>`;
    headerRow.insertCell(2).innerHTML = `<span onclick="sortValue()"> ${headers[2]} </span>`;
    headerRow.insertCell(3).innerHTML = `<span"> ${headers[3]} </span>`;
    headerRow.insertCell(4).innerHTML = `<span"> ${headers[4]} </span>`;

    document.body.append(table);
}

function deleteItem(id){
    let arr = [];
    let i = 0;
    while(i <= products.length - 1){
        if(i != id){
            arr.push(products[i]); 
        }

        i++;
    }
    
    products = arr;

    createTable();
    // console.log(table.children[1].children[id]);
    //table.removeChild(table.children[1].children[id]);
}

function edit(id){
    editId = id;
    name_.value = products[id].name;
    desc_.value = products[id].desc;
    value_.value = products[id].value;
    send.textContent = "Editar";
}

function select(id){

    let i = 0;
    let aux = 0;
    while(aux === 0){
        if(products[i].id === id){
            ans.textContent = `ID: ${products[i].id} Produto: ${products[i].name} Desc: ${products[i].desc} Valor: ${products[i].value}`;
            aux = 1;
        }

        i++;
    }
}

function deleteTable() {
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }

}

function sortName(){
    products.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
    });
    
    createTable();
}

function sortValue(){
    products.sort(function (a, b) { return a.value - b.value});

    createTable();
    console.log(products);
}
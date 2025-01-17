
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
                // name_.value = "teste";
                // desc_.value = "teste desc...";
                // value_.value = 120.00;

                /**
                 * Não é suficiente. 
                 * 
                 * Problema 1: o usuário pode digitar " " 
                 * (sem as aspas) para nome e/ou descrição.
                 * 
                 * Ideia: usar name_.value.trim() e desc_.value.trim() porque isso já retira
                 * os espaços em branco do início e do fim.
                 * 
                 * Problema 2: o usuário pode digitar preço negativo.
                 * 
                 * Ideia: converter em número com parseFloat() e checar se é negativo
                 * 
                 * Pode haver mais problemas, esses são 2 que consegui imaginar. 
                 * Parece que validar dados do usuário é complicado, muitos "edge cases"...
                 */
                if (name_.value === "" || desc_.value === "" || value_.value === "") {
                    /**
                     * Isso está errado: não faz sentido "throw alert()"
                     * 
                     * O comando "throw" deve ser seguido por um erro, como
                     * throw new Error("Falha no cadastro do produto !");
                     * 
                     * Da maneira como está, o javascript faz o alerta, depois faz o throw,
                     * e finalmente dá outro alerta no catch (que mostra undefined porque
                     * a variável "error" é undefined já que o throw não foi seguido de erro nenhum)
                     */
                    throw alert(`Falha no cadastro do produto!`);
                } else if (isNaN(value_.value)) {
                    throw alert(`Digite apenas numeros`);
                }

                let obj = {
                    id: id_++,
                    name: name_.value,
                    desc: desc_.value,
                    value: value_.value,
                    incluidoEm: new Date().getTime()
                }

                products.push(obj);
                alert(`Produto ${obj.name} incluído com sucesso!`);
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

            /**
             * Acho que esse listAll() poderia estar descomentado, porque assim
             * toda operação de edição faria com que a tabela fosse atualizada.
             * 
             * Da maneira como está, preciso editar e depois clicar em "listar" para
             * ver os dados que editei
             */
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

    for(let i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
    }

    /**
     * Aqui tem um erro de lógica que (por acaso) não causa nenhum efeito errado na página.
     * Vejamos:
     * 
     * 1. Na primeira vez que createTable() é executada, acontece o document.body.append(table),
     *    portanto a "table" é inserida no HTML.
     * 
     * 2. Se createTable() for executada de novo (por exemplo: porque o usuário clicou em "listar"),
     *    a função deleteTable() não remove a "table" do HTML, só apaga o conteúdo interno da "table".
     *    Finalmente, document.body.append(table) é executado de novo, mas a "table" já estava no HTML !!!!
     * 
     * Ou seja, a mesma "table" sofre várias vezes o append. Isso não dá nenhum erro visível porque
     * o comportamento do browser quando você dá varios append no mesmo elemento é: retirar o elemento de onde
     * ele estava e inserí-lo no final de novo. Assim, como a "table" já era o último elemento do body,
     * ela é retirada e reinserida como último elemento do body de novo (i.e. nada muda).
     * 
     * 
     */
    document.body.append(table);
}

/**
 * Só um detalhe de semântica aqui: o parâmetro da função não é o "id" do item, é o "índice" do item no array.
 * 
 * Então, na minha opinião, comunicaria melhor esse fato se o parâmetro chamasse "index".
 */
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

    /**
     * O loop estava estranho, no sentido de que a maneira de escrevê-lo não comunicava de imediato o propósito
     * do loop (que é percorrer o vetor até encontrar o produto com id correto, daí exibir as informações
     * desse produto e para o loop).
     * 
     * Tomei a liberdade de modificar a variável "aux" (renomeei para "encontrou" porque é isso que ela faz realmente)
     * e mudar a condição de parada do loop para tornar mais semântico o código.
     * 
     * Veja se fez sentido
     */
    let i = 0;
    let encontrou = false;
    while(i < products.length && encontrou === false){
        if(products[i].id === id){
            ans.textContent = `ID: ${products[i].id} Produto: ${products[i].name} Desc: ${products[i].desc} Valor: ${products[i].value}`;
            encontrou = true;
        }

        i++;
    }
}

function deleteTable() {
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild);
    }

}

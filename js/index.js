const produtosLista = listaProdutos; 
let tagUlProdutos = document.querySelector(".produtos");


function listarProdutos(listaProdutos){

    for (let i = 0; i < listaProdutos.length; i++){

        let produto = listaProdutos[i];
        let cardProduto = criarCardProdutos(produto);
        tagUlProdutos.appendChild(cardProduto);
    }
}

listarProdutos(produtosLista);


function criarCardProdutos(produto){

    let img = produto.img;
    let nameItem = produto.nameItem;
    let description = produto.description;
    let value = produto.value;
    let addCart = produto.addCart;
    let category = produto.tag;
    let id = produto.id

    let tagLi = document.createElement("li");
    let tagFigure = document.createElement("figure");
    let tagImg = document.createElement("img");
    let tagDivPai = document.createElement("div");
    let tagDivFilho1 = document.createElement("div");
    let tagPCategoria = document.createElement("p");
    let tagH2 = document.createElement("h2");
    let tagPDescricao = document.createElement("p");
    let tagDivFilho2 = document.createElement("div");
    let tagSpan = document.createElement("span");
    let tagButton = document.createElement("button");

    tagDivPai.classList.add("alinharDescricao");
    tagPCategoria.classList.add("categoria");

    tagImg.src = `${img}`;
    tagImg.alt = nameItem;
    tagImg.title = `${nameItem} - R$ ${value.toFixed(2)}`.replace("." , ",");
    tagPCategoria.innerText = category;
    tagH2.innerText = nameItem;
    tagPDescricao.innerText = description;
    tagSpan.innerHTML = `<strong>R$ ${value.toFixed(2)}</strong>`.replace("." , ",");
    tagButton.name = nameItem;
    tagButton.innerText = addCart;
    tagButton.id = id

    tagFigure.appendChild(tagImg);
    tagDivFilho1.append(tagPCategoria, tagH2, tagPDescricao);
    tagDivFilho2.append(tagSpan, tagButton);
    tagDivPai.append(tagDivFilho1, tagDivFilho2);
    tagLi.append(tagFigure, tagDivPai);

    return tagLi;
}


let tagAside = document.querySelector("aside");
let tagDivPesquisa = document.querySelector(".pesquisa");
let tagInput = document.createElement("input");
let tagButtonPesquisa= document.createElement("button");

tagInput.type = "text";
tagInput.placeholder = "Digite o produto ou categoria";
tagButtonPesquisa.innerText = "Pesquisar";
tagDivPesquisa.append(tagInput, tagButtonPesquisa);

let tagDivCarrinho = document.querySelector(".carrinho");
let tagUlCarrinho = document.querySelector(".produtoCarrinho");

let tagDivRodapeCarrinho = document.querySelector(".rodapeCarrinho");
let tagPQuantidade = document.createElement("p");
let tagPTotal = document.createElement("p");
let tagStrongQuantidade = document.createElement("strong");
let tagStrongTotal = document.createElement("strong");
tagDivRodapeCarrinho.append(tagPQuantidade, tagPTotal);


function listarProdutosCarrinho(listaProdutos){
    
    tagUlCarrinho.innerHTML = "";
    
    for (let i = 0; i < listaProdutos.length; i++){

        let produto = listaProdutos[i];
        let cardCarrinho = criarProdutosCarrinho(produto);
        tagUlCarrinho.appendChild(cardCarrinho);
    }
}


let resultadoId = [];

function criarProdutosCarrinho(produto){
    
    let img = produto.img;
    let nameItem = produto.nameItem;
    let value = produto.value;
    let id = produto.id;

    let tagLi = document.createElement("li");
    let tagFigure = document.createElement("figure");
    let tagImg = document.createElement("img");
    let tagDiv = document.createElement("div");
    let tagH2 = document.createElement("h2");
    let tagSpan = document.createElement("span");
    let tagButton = document.createElement("button");

    tagImg.src = img;
    tagH2.innerText = nameItem;
    tagSpan.innerHTML = `<strong>R$ ${value.toFixed(2)}</strong>`.replace("." , ",");
    tagButton.name = nameItem;
    tagButton.innerText = "Remover do carrinho";
    tagButton.id = id;

    tagFigure.appendChild(tagImg);
    tagDiv.append(tagH2, tagSpan, tagButton);
    tagLi.append(tagFigure, tagDiv);

    return tagLi;
}

    
tagUlProdutos.addEventListener("click", adicionarNoCarrinho);


function adicionarNoCarrinho(event){

    let buttonAdicionar = event.target;

    if(buttonAdicionar.tagName == "BUTTON"){
        buttonAdicionar.closest("li").cloneNode(true);      
        
        for(let i = 0; i < produtosLista.length; i++){
            let idProduto = buttonAdicionar.id;
            let produto = produtosLista[i];
            
            
            if(idProduto == produto.id){
                resultadoId.push(produto);
            }
            if(produto.value == buttonAdicionar){
                tagPTotal.innerText = produto.value
            }
        }
        
        listarProdutosCarrinho(resultadoId);

        let soma = 0;

        for(let i = 0; i < resultadoId.length; i++){
            tagDivRodapeCarrinho.classList.remove("esconder");
            tagDivCarrinho.classList.remove("carrinhoVazio");
            let quantidade = resultadoId.length;
            soma += resultadoId[i].value;
            tagPQuantidade.innerHTML =`<strong>Quantidade</strong> ${quantidade}`;
            tagPTotal.innerHTML = `<strong>Total</strong> R$ ${soma.toFixed(2)}`.replace("." , ",");
        }
    }
}


tagUlCarrinho.addEventListener("click", removerDoCarrinho);

function removerDoCarrinho(event){

    let buttonRemover = event.target;
    
    if(buttonRemover.tagName == "BUTTON"){

        for(let i = 0; i < resultadoId.length; i++){
            let idProduto = buttonRemover.id;
            let produto = resultadoId[i];
            
            if(produto.id == idProduto){
                resultadoId.splice(i, 1);
                
                break 
            }
        }

        listarProdutosCarrinho(resultadoId);

        let soma = 0;

        for(let i = 0; i <= resultadoId.length; i++){
            
            if(resultadoId.length > 0){
                let valor = resultadoId[i].value;
                soma += valor;
                let quantidade = resultadoId.length;
                tagPQuantidade.innerHTML =`<strong>Quantidade</strong> ${quantidade}`
                tagPTotal.innerHTML = `<strong>Total</strong> R$ ${soma.toFixed(2)}`.replace("." , ",");
            }
            else{
                carrinhoVazio()
            }
        }
    }
}

function carrinhoVazio(){

    tagDivCarrinho.classList.add("carrinhoVazio");
    tagDivRodapeCarrinho.classList.add("esconder");
    let tagH2 = document.createElement("h2");
    let tagP = document.createElement("p");

    tagH2.innerText = "Carrinho vazio";
    tagP.innerText = "Adicione itens";

    tagUlCarrinho.append(tagH2, tagP);
}

carrinhoVazio()
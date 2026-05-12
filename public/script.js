const data = {
    "produtos": [
      {
        "id": 1,
        "nome": "Kindle",
        "preco": 699.90,
        "categoria": "Smartphones",
        "imagem": "imgs/Kindle.png",
        "descricao": "Usado para ler.",
        "emEstoque": true
      },
      {
        "id": 2,
        "nome": "Bicicleta",
        "preco": 4599.00,
        "categoria": "Veiculos",
        "imagem": "imgs/bike.jpg",
        "descricao": "Usado para andar.",
        "emEstoque": false
      },
      {
        "id": 3,
        "nome": "Raquete",
        "preco": 199.89,
        "categoria": "Esportes",
        "imagem": "imgs/raquete.jpg",
        "descricao": "Raquete para praticar esportes.",
        "emEstoque": false
      },
      {
        "id": 4,
        "nome": "Fiat Strada",
        "preco": 98999.99,
        "categoria": "Veiculos",
        "imagem": "imgs/Strada.jpg",
        "descricao": "Veiculo motorizado para uso cotidiano.",
        "emEstoque": false
      }
    ]
  }

  function price(valor) {
    return `R$${valor}`
  }

  function createProduct(array) {
    const divProduto = document.createElement("div")
    divProduto.setAttribute("id", array.nome)
    document.getElementById("product-list").appendChild(divProduto)
    divProduto.classList.add(`${array.id}`)
    divProduto.innerHTML = `<div class="product"> <img class="img_config" src="${array.imagem}" alt=""> <p class="font_config">${array.nome} <p class="font_config">${price(array.preco)} <button class="font_config botao_pos">Ver Detalhes`
    return divProduto
  }

  function renderProducts(table) {
    dsp_prod.innerHTML = ""
    table.produtos.forEach(v => {
        if (dsp_prod.querySelector(`${v.nome}`) === null){
          createProduct(v)
        }
      });
  }

  function renderCategories(table) {
    table.produtos.forEach(v => {
        if (categoria.querySelector(`#${v.categoria}`) === null) {
          categoria.innerHTML += `<option id="${v.categoria}"> ${v.categoria}`
        }
      });
  }

  function filterProducts(busca, _categoria) {
    if (texto.trim().length === 0 === false){
      data.produtos.forEach(element => {
        if (!element.nome.includes(texto)) {
          document.getElementById(element.nome).remove()
        }
      });
    }
    if (!(selectedCat === "Todas")) {
      data.produtos.forEach(element => {
        if (!(element.categoria === selectedCat)) {
          document.getElementById(element.nome).remove()
        }
      });
    } 
  }


  const categoria = document.getElementById("category")
  const dsp_prod = document.getElementById("product-list")

  renderCategories(data)
  renderProducts(data)

  var texto = ""
  const procurar_por = document.querySelector("#search")
  procurar_por.addEventListener('input', function(evento){
    texto = evento.target.value
  })

  var selectedCat = "Todas"
  const categoriaProcura = document.querySelector("#category")
  categoriaProcura.addEventListener('change', function(evento){
    selectedCat = evento.target.value
  })

  const pesquisa_button = document.getElementById("btnRender")
  pesquisa_button.addEventListener('click', function(e) {
    renderProducts(data)
    filterProducts(texto, selectedCat)
  });
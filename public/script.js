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

  function base_produto(array, valor){
    if (valor === false) {
      var divProduto = document.createElement("div")
      divProduto.setAttribute("id", array.nome)
      divProduto.classList.add(`${array.id}`)
      document.getElementById("product-list").appendChild(divProduto)

      var divInterna = document.createElement("div")
      divInterna.classList.add("product")
      divProduto.appendChild(divInterna)
    } else {
      divProduto = document.getElementById(array.nome)
      divInterna = divProduto.querySelector("div")
    }

    const img = document.createElement("img")
    img.classList.add("img_config")
    img.src = array.imagem
    divInterna.appendChild(img)

    const pNome = document.createElement("p")
    pNome.classList.add("font_config")
    pNome.innerText = array.nome
    divInterna.appendChild(pNome)

    const pPreco = document.createElement("p")
    pPreco.classList.add("font_config")
    pPreco.innerText = price(array.preco)
    divInterna.appendChild(pPreco)
    return {divProduto, divInterna}
  }

  function createProduct(array) {
    const {divProduto, divInterna} = base_produto(array, false)
    
    const btn = document.createElement("button")
    btn.classList.add("font_config", "botao_pos")
    btn.id = "detalhes"
    btn.innerText = "Ver Detalhes"
    divProduto.appendChild(btn)

    var valor_input = false

    btn.addEventListener('click', function(){
      if (valor_input === false) {
        valor_input = true
        showProductDetails(divInterna, array)
      }else {
        valor_input = false
        divInterna.innerHTML = ""
        base_produto(array, true)
      }
    })
    return divProduto
  }

  function showProductDetails(produto, array) {
    produto.innerHTML = `<p class="font_config">ID: ${array.id}
        <p class="font_config">Nome: ${array.nome}
        <p class="font_config">Preço": ${array.preco}
        <p class="font_config">categoria: ${array.categoria}
        <p class="font_config">Descricao": ${array.descricao}
        <p class="font_config">Em estoque: ${array.emEstoque}`
  }

  function renderProducts(table) {
    dsp_prod.innerHTML = ""
    table.produtos.forEach(v => {
        if (dsp_prod.querySelector(`${v.nome}`) === null){
          return createProduct(v)
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
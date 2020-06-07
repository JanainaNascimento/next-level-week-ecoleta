function populateUFs(){

	const ufSelect = document.querySelector("select[name=uf]")
	ufSelect.innerHTML="<option>Selecione o Estado</option>"
	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
	.then( res => res.json())
	.then( states =>{

		for( const state of states){
			ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
			
		}
	} )
}

populateUFs()

function getCities (event){
const citySelect = document.querySelector("select[name=city]")
const stateInput = document.querySelector("input[name=state]")
const ufValue = event.target.value
const indexOfSelectedState = event.target.selectedIndex
stateInput.value = event.target.options[indexOfSelectedState].text

const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
citySelect.innerHTML="<option value>Selecione a Cidade</option>"
citySelect.disabled=true
fetch(url)
	.then( res => res.json())
	.then( cities =>{
		

		for( const city of cities){
			citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

		}
		citySelect.disabled = false
	} )
}


document
.querySelector("select[name=uf]")
.addEventListener("change",getCities)


//criando item para selecionar quando clicar
//pegar todos li's #lista

	const itemsToCollect = document.querySelectorAll(".items-grid li")
	
	for(const item of itemsToCollect) {
		item.addEventListener("click", handleSelectedItem)
	}

	const collectedItems = document.querySelector("input[name=items]")

		let selectedItems =[]
		function handleSelectedItem(event){
		
		const itemLi = event.target
		// adicionar ou remover uma classe 
		itemLi.classList.toggle("selected")
		const itemId = itemLi.dataset.id
		console.log('ITEM ID: ', itemId)


	    //verificar se exitem itens selecionados
		//pegar itens selecionados
		const alreadySelected = selectedItems.findIndex(function(item){
			const itemFound = item == itemId
			return itemFound//retorna true ou false
			
		})
			  
		//se já tiver selecionado, tirar da seleção
		if(alreadySelected >= 0){

			const filteredItems = selectedItems.filter(item=>{
				const itemIsDifferent = item != itemId
				return itemIsDifferent
			})
			selectedItems=filteredItems
			}else {//se não estiver selecionado, add a seleção
				selectedItems.push(itemId)

			}

			console.log('selectedItems: ', selectedItems)
		
		//atualizar o campo escondido com os itens selecionados
		collectedItems.value = selectedItems
		}
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

const initialState = {
    groceries: []
}

const groceryReducer = (state = initialState.groceries, action)=>{
    switch(action.type){
        case 'grocery/add':
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default:
            return state
    }
}

let store = Redux.createStore(groceryReducer)

const clearList = () => {
    document.getElementById('newitem').value = ''
    store.dispatch({
        type:'grocery/clear'
    })
}

const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type:'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}

grocerySubmit.addEventListener('click', (e)=>{newGrocery(e)})
clearBtn.addEventListener('click', clearList)

const renderList = (state) =>  {
    state.forEach(grocery => {
        let li = document.createElement('li')
        list.appendChild(li)
        li.textContent = grocery.text
    })
}

const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)
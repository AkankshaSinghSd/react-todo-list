import React, {useState} from 'react';
import "../components/todo.css";
import TodoList from './todoList';

const Todo=()=>{
 const [inputList, setInputList] = useState("");
const [item, setItem] = useState([])
 const itemEvent=(event)=>{
setInputList(event.target.value);
 };
 const listOfItem=()=>{
setItem((oldItem)=>{
return[...oldItem, inputList];

 });
 setInputList("");
}   

const deletItem=(id)=>{
setItem((oldItem)=>{
    return oldItem.filter((arrLi, index)=>{
        return index !== id;
    })
})
}


return(
    <>
    <div className='main_div'>
    <div className='center_div'>
        <br />
        <h1>Todo List</h1>
        <br />
        <input type='text' placeholder='Enter the item' value={inputList} onChange={itemEvent} />
        <button onClick={listOfItem}> +  </button>
        <ol>
            {/* <li>Buy Apple</li> */}
            {item.map((itemVal,index)=>{
               return <TodoList text={itemVal} key={index} id={index} onSelect={deletItem}/> 
            })}
        </ol>
    </div>
    </div>
    </>
)
}

export default Todo
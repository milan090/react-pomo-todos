import React from 'react'
import trashBin from '../../img/trashBin.png';

function Todo ({todo, rmTodo, index}) {
  return (
    <div className="todo">
      <h3 onClick={(e) => e.target.classList.toggle('striken')} >{todo}</h3>
      <img onClick={() => rmTodo(index)} src={trashBin} alt="delete button"/>
    </div>
  )
}

export default Todo;
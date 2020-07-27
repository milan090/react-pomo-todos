import React, { Component } from 'react'
import Todo from '../Todo/Todo.component';

export default class TodoList extends Component {

  state = {
    todos: [],
    input: ''
  }

  addTodo = () => {
    this.setState(state => {
      const newState = {...state};
      newState.todos = [...newState.todos,newState.input];
      newState.input = '';
      return newState;
    })
    document.getElementsByTagName('input')[0].value = '';
  }

  updateInput = (e) => {
    this.setState({input: e.target.value});
  }

  rmTodo = (index) => {
    this.setState(state => {
      const newState = {...state};
      newState.todos = state.todos.filter((todo, i) => i !== index);
      return newState;
    })
  }

  render (){
    return (
      <div className="center" id="todoList">
        <div>
          {
            this.state.todos.map(( todo, index) => (
              <Todo todo={todo} key={index} index={index} rmTodo={this.rmTodo}/>
            ))
          }
        </div>
        <div id="addTodo">
          <input 
            type="text" 
            placeholder="I Want To..." 
            onChange={this.updateInput}
            onKeyDown={(e) => {if(e.keyCode===13) this.addTodo()}}
          />
          <button onClick={this.addTodo}><img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" alt="add" width="50%"/></button>
        </div>
      </div>
    )
  }
}
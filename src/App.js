import React, { Component } from 'react';
import Pomodoro from './Components/Pomodoro/Pomodoro.component';
import TodoList from './Components/TodoList/TodoList.component';
import './styles/app.css';

export default class App extends Component {
  render(){
    return (
      <div>
        <h1 className="text-center">POMO-TODO</h1>
        <Pomodoro/>
        <TodoList/>
      </div>
    );
  }
}

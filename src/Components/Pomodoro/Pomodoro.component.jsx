import React, { Component } from 'react'
import Counter from '../Counter/Counter.component';
import tone from './alarm.mp3';

const INTERVALS = 4;
const alarm = new Audio(tone);

export default class Pomodoro extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    timerOn: false,
    mode: "FOCUS",
    intervalsLeft: INTERVALS
  }

  componentDidMount (){
    setInterval(() => {
      if (this.state.timerOn){
        if (this.state.minutes === 0 && this.state.seconds === 0){
          if (this.state.intervalsLeft <= 1){
            // Time for a long break
            this.modeHandler("LONG");
            this.setState({intervalsLeft:INTERVALS});

          } else {
            if (this.state.mode === "FOCUS"){
              this.modeHandler("SHORT");
            } else if (this.state.mode === "SHORT") {
              this.modeHandler("FOCUS");
              this.setState({intervalsLeft: this.state.intervalsLeft-1});
            } else {
              this.modeHandler("FOCUS");
            }
            this.setState({timerOn: true});
          }
          alarm.play();
        } else {
          this.setState(state => {
            return {
              ...state,
              seconds: state.seconds===0? 59 : state.seconds-1,
              minutes: state.seconds===0? state.minutes-1 : state.minutes
            }
          })
        }
      }
    },1000)
  }

  timerToggle = () => {
    this.setState({timerOn: !this.state.timerOn});
  }

  modeHandler = (mode) => {
    // Mode can be FOCUS || SHORT || LONG
    let minutes = 0;
    const styles = document.documentElement.style;
    switch (mode){
      case "FOCUS":
        minutes = 25;
        styles.setProperty('--primary-color', 'rgb(255, 81, 81)');
        styles.setProperty('--primary-color-dark', 'rgb(168, 0, 0)');
        break;
      case "LONG":
        minutes = 15;
        styles.setProperty('--primary-color', 'rgb(34, 140, 226)');
        styles.setProperty('--primary-color-dark', 'rgb(20, 102, 168)');
        break;
      case "SHORT":
        minutes = 5;
        styles.setProperty('--primary-color', 'rgb(8, 184, 46)');
        styles.setProperty('--primary-color-dark', 'rgb(4, 119, 38)');
        break;
      default:
        break;
    }

    this.setState((state) => {
      return {
        ...state,
        minutes: minutes,
        seconds: 0,
        mode: mode,
        timerOn: false
      }
    });
  }

  render (){
    return (
      <div id="pomodoro">
        <div className="controlBtns">
          <button 
            onClick={() => this.modeHandler("FOCUS")}
            className={this.state.mode==="FOCUS"?"activeModeBtn":''}
          >Let's Focus!</button>
          <button 
            onClick={() => this.modeHandler("SHORT")}
            className={this.state.mode==="SHORT"?"activeModeBtn":''}  
          >Short Break</button>
          <button 
            onClick={() => this.modeHandler("LONG")}
            className={this.state.mode==="LONG"?"activeModeBtn":''}
          >Long Break</button>
        </div>
        <Counter seconds={this.state.seconds} minutes={this.state.minutes}/>
        <button onClick={this.timerToggle} id="startBtn">{this.state.timerOn? "Stop": "Start"}</button>
      </div>
    )
  }
} 
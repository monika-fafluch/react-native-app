import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, Alert} from 'react-native';
import {vibrate} from './utils'
import { HitTestResultTypes } from 'expo/build/AR';


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      work: true,
      minutes: 25,
      seconds: '00',
      workMinutes: 25,
      workSeconds: '00',
      breakMinutes: 5,
      breakSeconds: '00',
      clientMinutes: null,
      clientSeconds: null,
      clientBreakMinutes: null,
      clientBreakSeconds: null,
      interval: null
    }
  }

  startCountdown() {  
    this.setState({clientMinutes: this.state.workMinutes})
    this.setState({clientSeconds: this.state.workSeconds})
    this.setState({clientBreakMinutes: this.state.breakMinutes})
    this.setState({clientBreakSeconds: this.state.breakSeconds})
    this.countSeconds()
  }

  count() {
    if (this.state.workSeconds === "00") {
      this.setState({workSeconds: 60})
      this.setState((prevState)=> ({workMinutes: prevState.workMinutes - 1}))
    }
    
    if (this.state.workSeconds < 10) {
      let sec = "00" + this.state.workSeconds
      //this.setState({workSeconds: sec})
      this.setState((prevState)=> ({workSeconds: ("00" + prevState.workSeconds)}))
    }
  
    this.setState((prevState)=> ({workSeconds: prevState.workSeconds - 1}))

    if(this.state.workSeconds < 1) {
      this.setState({workSeconds: "00"})
    }

    
    if(this.state.workMinutes < 1 && this.state.workSeconds == "00" ) { 
      vibrate()
      this.setState(({work: !this.state.work}))
      if (this.state.work === false) {
        this.state.workMinutes = this.state.breakMinutes
        this.state.workSeconds = this.state.breakSeconds
      }
      else {
        this.state.workMinutes = this.state.clientMinutes
        this.state.workSeconds = this.state.clientSeconds
      }
    }
  }
  
  countSeconds() {
    this.interval = setInterval(()=> this.count(), 1000)
  } 

  pauseCountdown() {
    clearInterval(this.interval)
  }

  resetCountdown() {
    if ( this.state.work ) {
      this.setState({workMinutes: this.state.clientMinutes})
      this.setState({workSeconds: this.state.clientSeconds})
    } 
    else {
      this.setState({workMinutes: this.state.breakMinutes})
      this.setState({workSeconds: this.state.breakSeconds})
    }
  }

  render() {
    return (
      <ImageBackground source={require('./assets/back3.jpg')} resizeMode='cover' style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.pomodoro}>{this.state.work? <Text>Work timer</Text>: <Text> Break timer</Text> }</Text>
          <View style={styles.timer}>
            <Text style={styles.time}>{this.state.workMinutes}:{this.state.workSeconds}</Text>
        <View style={styles.labels}>
          <Button onPress={() => this.startCountdown()} title="Start" style={styles.label}/>
          <Button onPress={() => this.pauseCountdown()} title="Pause" style={styles.label}/>
          <Button onPress={() => this.resetCountdown()} title="Reset" style={styles.label}/>
        </View>
        <View style={styles.inputs}>
          <Text style={styles.inputLabel}>Work</Text>
          <TextInput  onChangeText={(workMinutes) => this.setState({workMinutes})} maxLength={3} value={String(this.state.workMinutes)}
 placeholder="Minutes" keyboardAppearance={'dark'}  style={styles.input} required/>
          <TextInput style={styles.bold}>:</TextInput>
          <TextInput onChangeText={(workSeconds) => this.setState({workSeconds})} maxLength={2} value={String(this.state.workSeconds)} placeholder="Seconds" keyboardAppearance={'dark'}  style={styles.input} required/>
        </View>
        <View style={styles.inputs}>
          <Text style={styles.inputLabel}>Break</Text>
          <TextInput placeholder="Minutes" onChangeText={(breakMinutes) => this.setState({breakMinutes})} maxLength={3} value={String(this.state.breakMinutes)} keyboardAppearance={'dark'}  style={styles.input}/>
          <TextInput style={styles.bold}>:</TextInput>
          <TextInput placeholder="Seconds" onChangeText={(breakSeconds) => this.setState({breakSeconds})} maxLength={2} value={String(this.state.breakSeconds)}  keyboardAppearance={'dark'}  style={styles.input}/>
        </View>
      </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    top: '25%',
  },
  pomodoro: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#212121'
  },
  timer: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center'

  },
  time: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#383838'
  }, 
  labels: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#337d63',
    margin: 20
  },
  inputs: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center'
  },
  input: {  
    textAlign: 'center',  
    height: 40,  
    width: 100,
    borderRadius: 10,  
    borderWidth: 2,  
    borderColor: '#009688',  
    marginBottom: 10,
    margin: 5
  },
  inputLabel: {
    marginRight: 30,
    fontSize: 20,
    color: '#2c302f',
    fontWeight: 'bold',
    fontFamily: 'Arial'
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 18
  }
});

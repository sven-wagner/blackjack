import React, { Component } from 'react'
import PlayerFeld from './components/PlayerFeld';

import firebase from 'firebase';
import DB_CONFIG from './Config';

var suits = ["♠", "♥", "♦", "♣"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

var app = firebase.initializeApp(DB_CONFIG);

var Player = [];
var SpielerNummer = 0;
var currentPlayer = 0;
var deck = [];
var name = "Player";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      change: false,
      winnertxt: ""
    }

    this.Mischen = this.Mischen.bind(this);
    this.DeckErstellen = this.DeckErstellen.bind(this);
    this.SpierlerErstellen = this.SpierlerErstellen.bind(this);
    this.setName = this.setName.bind(this);

  }

  componentDidMount() {
    this.db_getdata('Players', (data) => {
      var temp = (data.data)
      console.log(temp)
      if (temp != "0") {
        Player.splice(0, Player.length)
        Player = JSON.parse(data.data);
        console.log(Player)
        this.db_getdata('deck', (data) => {
          deck = JSON.parse(data.data)
          this.db_getdata('currentPlayer', (data) => {
            currentPlayer = JSON.parse(data.data)
            if(currentPlayer != 100){
              this.setState({ winnertxt: "" })
            }
            else{
              this.CheckWinner();
            }
            this.setState({ change: true })
          })
        })
      }
    })
  }

  join() {
    this.UpdatePlayerData(() => {
      this.UpdateCountPlayer(() => {

      })
    });
  }

  UpdatePlayerData(callback) {
    this.db_getdata('Players', (value) => {
      if (SpielerNummer == 0) {
        console.log(value.data)
        if (value.data == "0") {
          this.SpierlerErstellen(1, () => {
            SpielerNummer = 1;
            console.log(Player)
            this.db_update('Players', Player)
          })
        }
        else {
          Player = JSON.parse(value.data)
          if (Player.length < 4) {
            this.SpierlerErstellen((Player.length + 1), () => {
              SpielerNummer = Player.length
              console.log(Player)
              this.db_update('Players', Player)
            })
          }
          else {
            alert("Die Lobby ist voll");
          }
        }
      }
    });
    callback();
  }
  UpdateCountPlayer(callback) {
    callback();
  }


  db_update(col, data) {
    var database = app.database().ref().child(col);
    database.update({ data: JSON.stringify(data) })
  }

  db_getdata = (col, callback) => {
    var database = app.database().ref().child(col);
    database.on('value', snap => {
      callback(snap.val())
    })
  }

  ButtonClickKarte() {
    console.log(currentPlayer)
    console.log(SpielerNummer)
    if (currentPlayer != 100 &&currentPlayer != 0 && currentPlayer == SpielerNummer) {
      this.KarteHinzufuegen(() => {
        this.CheckPoints()
      });
    }
  }

  ButtonClickReset() {
    if (SpielerNummer == 1) {
      this.DeckErstellen(() => {
        this.Mischen(() => {
          this.StartKarten(() => {
            currentPlayer = 1;
            this.db_update('currentPlayer', 1)
          })
        });
      })
    }
  }

  StartKarten(callback) {
    if (SpielerNummer == 1) {
      for (var i = 0; i < Player.length; i++) {
        var karte = deck[0];
        var temp = Player;
        temp[i].Points += karte.Weight;
        temp[i].Hand.push(karte);
        Player = temp
        deck.shift();
        this.db_update('deck', deck);
        this.db_update('Players', Player);
      }
    }
    callback();
  }

  CheckPoints() {
    console.log(Player[currentPlayer - 1].Points)
    if (Number(Player[currentPlayer - 1].Points) >= Number(21)) {
      this.NextPlayer();
    }
  }

  NextPlayer() {
    if (currentPlayer == SpielerNummer) {
      if (currentPlayer != 100 &&currentPlayer != 0) {
        if ((currentPlayer + 1) != Player.length + 1) {
          var temp = currentPlayer + 1;
          currentPlayer = temp;
          this.db_update('currentPlayer', temp)
        }
        else {
          currentPlayer = 100;
          this.db_update('currentPlayer', 100)
          this.CheckWinner();
        }
        this.db_update('deck', deck);
      }
    }
  }

  CheckWinner() {
    var winner = [];
    for (var i = 0; i < Player.length; i++) {
      console.log(i)
      if (winner.length == 0 && Player[i].Points <= 21) {
        console.log("Ja")
        var temp = { "Name": Player[i].Name, "Points": Player[i].Points }
        winner.push(temp);
        console.log(winner)
      }
      else if (Player[i].Points <= 21 && Player[i].Points > winner[0].Points) {
        winner = [];
        var temp = { "Name": Player[i].Name, "Points": Player[i].Points }
        winner.push(temp);
      }
      else if (Player[i].Points <= 21 && Player[i].Points > winner[0].Points) {
        var temp = { "Name": Player[i].Name, "Points": Player[i].Points }
        winner.push(temp);
      }
    }

    if(winner.length == 0){
      this.setState({winnertxt: "Keiner konnte gewinnen"})
    }
    else if(winner.length == 1){
      this.setState({winnertxt: winner[0].Name + " hat gewonnen"})
    }
    else{
      var temp = "";
      for(var i = 0; i < winner.length; i++){
        temp += winner[i].Name +", "
      }
      this.setState({winnertxt: temp + " haben gewonnen"})
    }
  }

  KarteHinzufuegen(callback) {
    if (deck.length > 0) {
      var karte = deck[0];
      for (var i = 0; i < Player.length; i++) {
        if (Player[i].ID == SpielerNummer) {
          var temp = Player;
          temp[i].Points += karte.Weight;
          temp[i].Hand.push(karte);
          Player = temp;
          deck.shift();
          this.db_update('deck', deck);
          this.db_update('Players', Player);
          break;
        }
      }
    }
    callback();
  }

  Mischen(callback) {
    for (var i = 0; i < 1000; i++) {
      var pos1 = Math.floor((Math.random() * deck.length));
      var pos2 = Math.floor((Math.random() * deck.length));
      var temp = deck[pos1];

      deck[pos1] = deck[pos2];
      deck[pos2] = temp;
    }
    this.db_update('deck', deck);
    callback();
  }

  DeckErstellen(callback) {

    deck = [];
    var temp = deck;
    for (var i = 0; i < values.length; i++) {
      for (var x = 0; x < suits.length; x++) {

        var weight = parseInt(values[i]);

        if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
          weight = 10;
        }
        if (values[i] == "A") {
          weight = 11;
        }

        var card = { Value: values[i], Suit: suits[x], Weight: weight };

        temp.push(card)
      }
      deck = temp;
    }
    callback();
  }

  SpierlerErstellen(id, callback) {

    var temp = Player;
    var hand = new Array();
    var player = { Name: name, ID: id, Points: 0, Hand: hand };
    temp.push(player);

    Player = temp;
    callback();
  }

  getText() {
    if (currentPlayer != 100 && currentPlayer != 0) {
      return (
        <h1 className="text-white row d-flex justify-content-center">{Player[Number(currentPlayer) - 1].Name} ist dran</h1>
      )
    }
  }

  Reset() {
    this.db_update('Players', 0);
    this.db_update('currentPlayer', 0)
    window.location.reload();
  }
  getPlayerText() {
    if (SpielerNummer != 0) {
      return (
        <h6 className="text-white m-2 mt-3">{Player[Number(SpielerNummer) - 1].Name}</h6>
      )
    }
  }

  setName(e) {
    name = e.target.value;
    console.log(name)
  }

  RestartGame(){
    for(var i = 0; i < Player.length; i++){
      Player[i].Hand = [];
      Player[i].Points = 0;
    }

    this.DeckErstellen(() =>{
      this.Mischen(() =>{
        this.StartKarten(() =>{
          this.db_update('deck', deck);
          this.db_update('Players', Player);
          this.db_update('currentPlayer', 1)
        })
      })
    })
  }

  btnRestart(){
    if(SpielerNummer == 1 && currentPlayer == 100 && this.state.winnertxt != ""){
      return(
        <div className="row d-flex justify-content-center">
          <button className="btn btn btn-outline-warning m-2 mt-2 " onClick={() => { this.RestartGame() }}>Restart</button>
        </div>
      )
    }
    else if(SpielerNummer != 1 && this.state.winnertxt != ""){
      return(
        <h3 className="text-white row d-flex justify-content-center">Warte auf dem Host...</h3>
      )
    }
  }

  render() {
    return (
      <div className="Page">
        <div className="row d-flex justify-content-center">
          <button className="btn btn btn-outline-warning m-2 mt-2" onClick={() => { this.Reset() }}>Reset</button>
          <button className="btn btn btn-outline-warning m-2 mt-2" onClick={() => { this.ButtonClickReset() }}>Start</button>
          <button className="btn btn btn-outline-warning m-2 mt-2" onClick={() => { this.join() }}>Join</button>
          <input type="text" className="form-control w-25 m-2 mt-2 btn-warning" placeholder="Name" aria-label="Name" onChange={this.setName}></input>
        </div>
        <div className="row d-flex justify-content-center">
          {this.getPlayerText()}
          <button className="btn btn btn-outline-light m-2 mt-2" onClick={() => { this.ButtonClickKarte() }}>Hit</button>
          <button className="btn btn btn-outline-light m-2 mt-2" onClick={() => { this.NextPlayer() }}>Stand</button>
        </div>
        {this.getText()}
        <h1 className="text-white row d-flex justify-content-center">{this.state.winnertxt}</h1>
        {this.btnRestart()}

        {<div className="row d-flex justify-content-center">
          {
            Player?.map(item =>
              <PlayerFeld
                key={item.ID}
                name={item.Name}
                points={item.Points}
                karten={item.Hand}
              />
            )
          }
        </div>}
      </div>
    )
  }
}


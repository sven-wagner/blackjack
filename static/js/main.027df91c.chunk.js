(this.webpackJsonpblackjack=this.webpackJsonpblackjack||[]).push([[0],{17:function(e,t,n){e.exports=n(35)},22:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),i=n(15),c=n.n(i),s=(n(22),n(23),n(8)),l=n(9),o=n(7),u=n(11),m=n(10),d=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"getKarte",value:function(){return"\u2665"==this.props.form||"\u2666"==this.props.form?r.a.createElement("div",{className:"card text-center text-danger"},r.a.createElement("div",{className:"col"},this.props.zahl),r.a.createElement("div",{className:"col"},this.props.form)):r.a.createElement("div",{className:"card text-center "},r.a.createElement("div",{className:"col"},this.props.zahl),r.a.createElement("div",{className:"col"},this.props.form))}},{key:"render",value:function(){return r.a.createElement("div",{className:"col-sm-2 ml-1 mr-1 mt-1 mb-1"},this.getKarte())}}]),n}(a.Component),h=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(s.a)(this,n),t.call(this)}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"col-sm-3"},r.a.createElement("div",{className:"card text-center"},r.a.createElement("div",{className:"col"},this.props.name),r.a.createElement("div",{className:"col"},this.props.points),r.a.createElement("div",{className:"row d-flex justify-content-center"},this.props.karten.map((function(e){return r.a.createElement(d,{key:e,zahl:e.Value,form:e.Suit})})))))}}]),n}(a.Component),f=n(16),b={apiKey:"AIzaSyAWywfEkMvd2_F_2dNSTYvHUvoE-L3Q8gA",authDomain:"blackjack-f985f.firebaseapp.com",databaseURL:"https://blackjack-f985f.firebaseio.com",projectId:"blackjack-f985f",storageBucket:"blackjack-f985f.appspot.com",messagingSenderId:"943105441301",appId:"1:943105441301:web:cec433cb166cf6077bd81c",measurementId:"G-TG145BVRSB"},p=["\u2660","\u2665","\u2666","\u2663"],v=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],k=n.n(f).a.initializeApp(b),y=[],g=0,N=0,P=[],E="Player",w=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(s.a)(this,n),(e=t.call(this)).db_getdata=function(e,t){k.database().ref().child(e).on("value",(function(e){t(e.val())}))},e.state={change:!1,winnertxt:""},e.Mischen=e.Mischen.bind(Object(o.a)(e)),e.DeckErstellen=e.DeckErstellen.bind(Object(o.a)(e)),e.SpierlerErstellen=e.SpierlerErstellen.bind(Object(o.a)(e)),e.setName=e.setName.bind(Object(o.a)(e)),e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.db_getdata("Players",(function(t){"0"!=t.data&&(y.splice(0,y.length),y=JSON.parse(t.data),e.db_getdata("deck",(function(t){P=JSON.parse(t.data),e.db_getdata("currentPlayer",(function(t){100!=(N=JSON.parse(t.data))?e.setState({winnertxt:""}):e.CheckWinner(),e.setState({change:!0})}))})))}))}},{key:"join",value:function(){var e=this;this.UpdatePlayerData((function(){e.UpdateCountPlayer((function(){}))}))}},{key:"UpdatePlayerData",value:function(e){var t=this;this.db_getdata("Players",(function(e){0==g&&("0"==e.data?t.SpierlerErstellen(1,(function(){g=1,t.db_update("Players",y)})):(y=JSON.parse(e.data)).length<4?t.SpierlerErstellen(y.length+1,(function(){g=y.length,t.db_update("Players",y)})):alert("Die Lobby ist voll"))})),e()}},{key:"UpdateCountPlayer",value:function(e){e()}},{key:"db_update",value:function(e,t){k.database().ref().child(e).update({data:JSON.stringify(t)})}},{key:"ButtonClickKarte",value:function(){var e=this;100!=N&&0!=N&&N==g&&this.KarteHinzufuegen((function(){e.CheckPoints()}))}},{key:"ButtonClickReset",value:function(){var e=this;1==g&&this.DeckErstellen((function(){e.Mischen((function(){e.StartKarten((function(){N=1,e.db_update("currentPlayer",1)}))}))}))}},{key:"StartKarten",value:function(e){if(1==g)for(var t=0;t<y.length;t++){var n=P[0],a=y;a[t].Points+=n.Weight,a[t].Hand.push(n),y=a,P.shift(),this.db_update("deck",P),this.db_update("Players",y)}e()}},{key:"CheckPoints",value:function(){Number(y[N-1].Points)>=Number(21)&&this.NextPlayer()}},{key:"NextPlayer",value:function(){if(N==g&&100!=N&&0!=N){if(N+1!=y.length+1){var e=N+1;N=e,this.db_update("currentPlayer",e)}else N=100,this.db_update("currentPlayer",100),this.CheckWinner();this.db_update("deck",P)}}},{key:"CheckWinner",value:function(){for(var e=[],t=0;t<y.length;t++)if(0==e.length&&y[t].Points<=21){var n={Name:y[t].Name,Points:y[t].Points};e.push(n)}else if(y[t].Points<=21&&y[t].Points>e[0].Points){e=[];n={Name:y[t].Name,Points:y[t].Points};e.push(n)}else if(y[t].Points<=21&&y[t].Points>e[0].Points){n={Name:y[t].Name,Points:y[t].Points};e.push(n)}if(0==e.length)this.setState({winnertxt:"Keiner konnte gewinnen"});else if(1==e.length)this.setState({winnertxt:e[0].Name+" hat gewonnen"});else{for(n="",t=0;t<e.length;t++)n+=e[t].Name+", ";this.setState({winnertxt:n+" haben gewonnen"})}}},{key:"KarteHinzufuegen",value:function(e){if(P.length>0)for(var t=P[0],n=0;n<y.length;n++)if(y[n].ID==g){var a=y;a[n].Points+=t.Weight,a[n].Hand.push(t),y=a,P.shift(),this.db_update("deck",P),this.db_update("Players",y);break}e()}},{key:"Mischen",value:function(e){for(var t=0;t<1e3;t++){var n=Math.floor(Math.random()*P.length),a=Math.floor(Math.random()*P.length),r=P[n];P[n]=P[a],P[a]=r}this.db_update("deck",P),e()}},{key:"DeckErstellen",value:function(e){for(var t=P=[],n=0;n<v.length;n++){for(var a=0;a<p.length;a++){var r=parseInt(v[n]);"J"!=v[n]&&"Q"!=v[n]&&"K"!=v[n]||(r=10),"A"==v[n]&&(r=11);var i={Value:v[n],Suit:p[a],Weight:r};t.push(i)}P=t}e()}},{key:"SpierlerErstellen",value:function(e,t){var n=y,a=new Array,r={Name:E,ID:e,Points:0,Hand:a};n.push(r),y=n,t()}},{key:"getText",value:function(){if(100!=N&&0!=N)return r.a.createElement("h1",{className:"text-white row d-flex justify-content-center"},y[Number(N)-1].Name," ist dran")}},{key:"Reset",value:function(){this.db_update("Players",0),this.db_update("currentPlayer",0),window.location.reload()}},{key:"getPlayerText",value:function(){if(0!=g)return r.a.createElement("h6",{className:"text-white m-2 mt-3"},y[Number(g)-1].Name)}},{key:"setName",value:function(e){E=e.target.value}},{key:"RestartGame",value:function(){for(var e=this,t=0;t<y.length;t++)y[t].Hand=[],y[t].Points=0;this.DeckErstellen((function(){e.Mischen((function(){e.StartKarten((function(){e.db_update("deck",P),e.db_update("Players",y),e.db_update("currentPlayer",1)}))}))}))}},{key:"btnRestart",value:function(){var e=this;return 1==g&&100==N&&""!=this.state.winnertxt?r.a.createElement("div",{className:"row d-flex justify-content-center"},r.a.createElement("button",{className:"btn btn btn-outline-warning m-2 mt-2 ",onClick:function(){e.RestartGame()}},"Restart")):1!=g&&""!=this.state.winnertxt?r.a.createElement("h3",{className:"text-white row d-flex justify-content-center"},"Warte auf dem Host..."):void 0}},{key:"render",value:function(){var e,t=this;return r.a.createElement("div",{className:"Page"},r.a.createElement("div",{className:"row d-flex justify-content-center"},r.a.createElement("button",{className:"btn btn btn-outline-warning m-2 mt-2",onClick:function(){t.Reset()}},"Reset"),r.a.createElement("button",{className:"btn btn btn-outline-warning m-2 mt-2",onClick:function(){t.ButtonClickReset()}},"Start"),r.a.createElement("button",{className:"btn btn btn-outline-warning m-2 mt-2",onClick:function(){t.join()}},"Join"),r.a.createElement("input",{type:"text",className:"form-control w-25 m-2 mt-2 btn-warning",placeholder:"Name","aria-label":"Name",onChange:this.setName})),r.a.createElement("div",{className:"row d-flex justify-content-center"},this.getPlayerText(),r.a.createElement("button",{className:"btn btn btn-outline-light m-2 mt-2",onClick:function(){t.ButtonClickKarte()}},"Hit"),r.a.createElement("button",{className:"btn btn btn-outline-light m-2 mt-2",onClick:function(){t.NextPlayer()}},"Stand")),this.getText(),r.a.createElement("h1",{className:"text-white row d-flex justify-content-center"},this.state.winnertxt),this.btnRestart(),r.a.createElement("div",{className:"row d-flex justify-content-center"},null===(e=y)||void 0===e?void 0:e.map((function(e){return r.a.createElement(h,{key:e.ID,name:e.Name,points:e.Points,karten:e.Hand})}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.027df91c.chunk.js.map
const Data = location.search.split("=");
const uName = Data[1].split(
  Data[1].indexOf("+") != -1 ? "+" : "&")[0];
const pswd = Data[2];
if (pswd != "1234") {
  alert("Wrong passward!!");
  location.assign(location.origin);
} else {
  document.getElementById("mainContainer").style.visibility = "visible";
}

const sButton = document.getElementById("sendButton");
const skt = io();

skt.emit("join to chat", uName);

skt.on("message", (input) => {
  var newMsgD = document.createElement("div");
  newMsgD.className = "messageCard active " + input.uName;

  var newperson = document.createElement("p");
  newperson.className = "userName";
  newperson.innerText = input.uName;

  var newMsg = document.createElement("p");
  newMsg.className = "message";
  newMsg.innerText = input.msgSEnt;

  newMsgD.appendChild(newperson);
  newMsgD.appendChild(newMsg);
  document.getElementById("messagesDiv").appendChild(newMsgD);
});

skt.on("updateMessagesDisconnect", (uName) => {
  var msgcards = document.getElementsByClassName(uName);
  for (var i = 0; i < msgcards.length; i++) {
    msgcards[i].className = "messageCard inactive " + uName;
  }
});

skt.on("updateMessagesConnect", (uName) => {
  var msgcards = document.getElementsByClassName(uName);
  for (var i = 0; i < msgcards.length; i++) {
    msgcards[i].className = "messageCard active " + uName;
  }
});

sButton.addEventListener("click", (e) => {
  let msgSEnt = document.getElementById("messageBox").value;
  skt.emit("sentMessage", { msgSEnt, uName });
});
let userMail = "";

async function getMail() {
  const { value: email } = await Swal.fire({
    title: "Enter your email",
    input: "email",
    inputLabel: "Your email address",
    // inputValue: "",
    showCancelButton: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write an email!";
      }
    },
  });
  userMail = email;
}

getMail();

function SendToBack(userMail, userMsg) {
  socket.emit("MsgNew", {
    user: userMail,
    message: userMsg.value,
  });
}

const msgBox = document.getElementById("userMsg");
userMsg.addEventListener("keyup", ({ key }) => {
  if (key === "Enter") {
    SendToBack(userMail, msgBox);
    msgBox.value = "";
  }
});

const btnSend = document.getElementById("btnSend");
btnSend.addEventListener("click", () => {
  SendToBack(userMail, msgBox);
  msgBox.value = "";
});

socket.on("MsgHistory", (msgLog) => {
  const divMsgLog = document.getElementById("logMsg");
  let msgLogFormateados = "";
  msgLog.forEach((msg) => {
    msgLogFormateados += "<div style='border: 1px solid red;'>";
    msgLogFormateados += "<p>" + msg.user + "</p>";
    msgLogFormateados += "<p>" + msg.message + "</p>";
    msgLogFormateados += "</div>";
  });
  divMsgLog.innerHTML = msgLogFormateados;
});

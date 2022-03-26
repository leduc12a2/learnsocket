const { count } = require('console');
const express = require('express')
const app = express();
app.use(express.static("public"))
app.set("view engine", "ejs")
app.set("views", "./views")

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);

//Route
app.get("/", function (req, res) {
    res.render("trangchu")
})

app.get("/chat", function (req, res) {
    res.render("chat")

})

app.get("/chatRoom", function (req, res) {
    res.render("chatRoom")
})

app.get("/miniGame", function (req, res) {
    res.render("miniGame")
})

var listUser = []
var countTyping = 0

//Stuct MINI GAME QUAN LY HOC VIEN

function HocVien(hoten, email, sodt) {
    this.hoten = hoten;
    this.email = email;
    this.sodt = sodt;
}

//MINI GAME data
var userMiniGame = []
//Socket 
io.on("connection", function (socket) {
    console.log("Co ket noi toi server", socket.id)
    socket.on("client-send-Username", function (name) {
        const checkUser = listUser.filter(data => data === name);
        if (checkUser.length > 0) {
            return socket.emit("server-send-dki-thatbai")
        } else {
            listUser.push(name)
            socket.Username = name
            socket.emit("server-send-dki-thanhcong", name)
            io.sockets.emit("server-send-danhsach-Users", listUser)
        }
        // listUser.push({ user })
    })
    socket.on("logout", () => {
        console.log(socket.Username)
        listUser = listUser.filter(data => data !== socket.Username)
        socket.emit("server-send-logout-thanhcong")
        socket.broadcast.emit("server-send-danhsach-Users", listUser)
    })
    socket.on("user-send-message", (data) => {
        io.sockets.emit("server-send-message", {
            un: socket.Username,
            nd: data
        })
    })
    socket.on("toi-dang-go-chu", (data) => {
        countTyping++
        console.log(countTyping);
        if (countTyping === 1) {
            io.sockets.emit("ai-do-dang-go-chu", socket.Username + ' ' + "dang go chu")
        } else {
            io.sockets.emit("ai-do-dang-go-chu", "ai do dang go chu")
        }
        // socket.broadcast.emit("server-send-go-chu", )
    })
    socket.on("toi-stop-go-chu", (data) => {
        countTyping--
        io.sockets.emit("toi-stop-go-chu")
    })
    //TAO ROOM
    // console.log("Cac Room Dang Co", socket.adapter.rooms)
    socket.on("tao-room", (data) => {
        socket.join(data);
        socket.Phong = data;
        // io.broadcast.emit("server-send")
        // console.log("Cac Room Dang Co", socket.adapter.rooms)
        var mang = []
        for (r of socket.adapter.rooms) {
            mang.push(r[0])
        }
        console.log(mang);
        io.sockets.emit("server-send-rooms", mang)
        socket.emit("server-send-room-socket", data)
    })
    socket.on("user-chat", function (data) {
        io.sockets.in(socket.Phong).emit("server-chat", data)
    })
    //MINI GAME 
    socket.on("hocvien-gui-thongtin", function (data) {
        userMiniGame.push(
            new HocVien(data.hoten, data.email, data.sodt)
        )
        io.sockets.emit("server-gui-ds", userMiniGame)
    })

})


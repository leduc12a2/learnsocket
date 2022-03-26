const socket = io("https://learnsocket.herokuapp.com")

socket.on("server-send-rooms", function (data) {
    $("#dsRoom").html("");
    console.log(data);
    data.map(function (r) {
        console.log(r);
        $("#dsRoom").append(`<h4 class="room"> ${r} </h4>`)
    })
})
socket.on('server-send-room-socket', function (data) {
    $("#roomHienTai").html(data)
})
socket.on('server-chat', function (data) {
    $("#right").append(`<div> ${data} </div>`)
})
$(document).ready(function () {
    $("#btnTaoRoom").click(function () {
        socket.emit("tao-room", $("#txtRoom").val());
    })
    $("#btnChat").click(function () {
        socket.emit("user-chat", $("#txtMessage").val());
    })
})
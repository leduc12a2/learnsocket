const socket = io("http://localhost:3000")

socket.on("server-send-dki-thatbai", function () {
    alert("UserName Da Ton Tai")
})
socket.on("server-send-danhsach-Users", function (data) {
    $("#boxContent").html("")
    data.map(data => (
        $("#boxContent").append(`<div class='useronline'>  ${data}  <div/>`)
    ))
    console.log(data);
})
socket.on("server-send-dki-thanhcong", function (data) {
    $("#txtUsername").val('');
    console.log(data);
    $("#loginForm").hide();
    $("#chatForm").show();
    $("#currentUser").html(data)
    // alert("Dang Ky Thanh Cong")
})
socket.on("server-send-logout-thanhcong", function () {
    $("#currentUser").html("")
    $("#loginForm").show();
    $("#chatForm").hide();

})
socket.on("server-send-message", function (data) {
    $("#listMessage").append(`<div class="ms">(User: ${data.un}) :  ${data.nd} </div>`)

})
socket.on("ai-do-dang-go-chu", function (data) {
    $("#thongbao").html(`${data}`)
})
socket.on("toi-stop-go-chu", function (data) {
    $("#thongbao").html('')
})
$(document).ready(function () {
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function () {
        const getUserName = $("#txtUsername").val().trim();
        if (!getUserName) {
            return alert("Nhap UserName");
        }
        socket.emit("client-send-Username", getUserName)
    })

    $("#btnLogout").click(function () {
        socket.emit("logout")
    })

    $("#btnSendMessage").click(function () {
        socket.emit("user-send-message", $("#txtMessage").val())
    })

    //Su kien dang nhap tin nhan
    $("#txtMessage").focusin(function () {
        socket.emit("toi-dang-go-chu")
    })
    $("#txtMessage").focusout(function () {
        console.log("out");
        socket.emit("toi-stop-go-chu")
    })



})
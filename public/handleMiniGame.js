const socket = io("http://localhost:3000")

socket.on("server-gui-ds", function (data) {
    $("#ds").html("")
    data.map((d, index) => (
        $("#ds").append(` <div class='hocvien'>
                    <div class='hang1'>id: ${index + 1} || <span> ${d.hoten}</span></div>
                    <div class='hang2'>${d.email} -- ${d.sodt}</div>
                </div>`)
    ))
})

$(document).ready(function () {
    $("#btnRegister").click(function () {
        socket.emit("hocvien-gui-thongtin", {
            hoten: $("#txtHoTen").val(),
            email: $("#txtEmail").val(),
            sodt: $("#txtSoDT").val(),
        })
    })
})
var imgData = [];
var count = 0

var ctx = myCanvas.getContext("2d");
var list0 = new Array()
var list1 = new Array()

window.onload = function() {
    var myCanvas = document.getElementById('myCanvas')

    var round = myCanvas.getContext('2d')



    //qz.x = 1;
    //qz.y = 2;


    for (var i = 0; i <= 600; i = i + 30) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();
        ctx.moveTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }
    context = document.getElementById("myCanvas").getContext('2d');
    imgData[0] = context.getImageData(0, 0, 600, 600);
    myCanvas.addEventListener("click", function(event) {
        getMousePos(myCanvas, event);
    });

    function paint(a, b, c) {
        //canvas_copy()


        qz = new Object();
        qz.x = a / 30;
        qz.y = b / 30;
        //判断棋子是否已存在
        if (checkExists(qz)) {
            return;
        }

        round.beginPath();
        round.arc(a, b, 10, 0, 2 * Math.PI);
        if (count % 2 === 0) {
            //保存棋子
            list0[parseInt(count / 2)] = qz;
            round.fillStyle = "#000000"
            round.fill()
            round.stroke();
        } else {
            list1[parseInt(count / 2)] = qz;
            round.fillStyle = "#FFFFFF"
            round.fill()
            round.stroke();
        }
        canvas_copy();
        //判断输赢
        if (checkWin(qz)) {
            return;
        }

        //console.log(list0);

        //console.log(list1);
        count++;

    }

    function point(x, y) {
        //count=count+1
        var zx = parseInt(x % 30)
        var zzx = parseInt(x / 30)
        var zy = parseInt(y % 30)
        var zzy = parseInt(y / 30)
        if (zx * zx + zy * zy <= 100) {
            paint(zzx * 30, zzy * 30, count);
        }
        if (zx * zx + (30 - zy) * (30 - zy) <= 100) {
            paint(zzx * 30, (zzy + 1) * 30, count);
        }
        if ((30 - zx) * (30 - zx) + zy * zy <= 100) {
            paint((zzx + 1) * 30, zzy * 30, count);
        }
        if ((30 - zx) * (30 - zx) + (30 - zy) * (30 - zy) <= 100) {
            paint((zzx + 1) * 30, (zzy + 1) * 30, count);
        }
    }

    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left * (canvas.width / rect.width);
        var y = event.clientY - rect.top * (canvas.height / rect.height);
        point(x, y)
        //console.log("x:" + x + ",y:" + y);
    }

    function checkExists(qz) {
        for (var i = 0; i < parseInt(count / 2); i++) {
            if (qz.x == list0[i].x && qz.y == list0[i].y) {
                return true
            }
            if (qz.x == list1[i].x && qz.y == list1[i].y) {
                return true
            }
        }
        if (parseInt(count % 2) == 1) {
            if (qz.x == list0[parseInt(count / 2)].x && qz.y == list0[parseInt(count / 2)].y) {
                return true
            }
        }
        return false;
    }

    function checkExistsSigle(qz, list) {
        for (var i = 0; i < parseInt(count / 2); i++) {
            if (qz.x == list[i].x && qz.y == list[i].y) {
                return true
            }
        }

        return false;

    }


    function checkWin(qz) {
        //判断 |,一,\,/ 四个方向是否有5子相连
        //先判断正方向,再判断负方向
        if (count % 2 === 0) {
            winner = "黑棋"
            listr = list0;
        }
        if (count % 2 === 1) {
            winner = "白棋"
            listr = list1;

        }

        var fiveQz1 = 1;
        var fiveQz2 = 1;
        var fiveQz3 = 1;
        var fiveQz4 = 1;
        lengx1 = 1;
        lengy1 = 1;
        lengx2 = 1;
        lengy2 = 1;
        lengx3 = 1;
        lengy3 = 1;
        lengx4 = 1;
        lengy4 = 1;

        qz1 = new Object();

        qz1.x = qz.x;
        qz1.y = qz.y;
        //正
        for (var i = 1; i <= 5; i++) {


            ////1
            qz1.x = qz.x;
            qz1.y = qz.y + i;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz1 = fiveQz1 + lengx1;
            } else {
                lengx1 = 0;
            }
            qz1.x = qz.x;
            qz1.y = qz.y - i;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz1 = fiveQz1 + lengy1;
            } else {
                lengy1 = 0;
            }
            ////2
            qz1.x = qz.x + i;
            qz1.y = qz.y;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz2 = fiveQz2 + lengx2;
            } else {
                lengx2 = 0;
            }

            qz1.x = qz.x - i;
            qz1.y = qz.y;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz2 = fiveQz2 + lengy2;
            } else {
                lengy2 = 0;
            }
            ////3
            qz1.x = qz.x + i;
            qz1.y = qz.y + i;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz3 = fiveQz3 + lengx3;
            } else {
                lengx3 = 0;
            }

            qz1.x = qz.x - i;
            qz1.y = qz.y - i;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz3 = fiveQz3 + lengy3;
            } else {
                lengy3 = 0;
            }
            /////4
            qz1.x = qz.x - i;
            qz1.y = qz.y + i;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz4 = fiveQz4 + lengx4;
            } else {
                lengx4 = 0;
            }

            qz1.x = qz.x + i;
            qz1.y = qz.y - i;
            if (checkExistsSigle(qz1, listr)) {
                fiveQz4 = fiveQz4 + lengy4;
            } else {
                lengy4 = 0;
            }
        }
        if (fiveQz1 >= 5 || fiveQz2 >= 5 || fiveQz3 >= 5 || fiveQz4 >= 5) {
            alert(winner + " 赢!")
        }
        return false;

    }

    function canvas_copy() {
        var context = document.getElementById("myCanvas").getContext('2d');
        var width = context.canvas.width;
        var height = context.canvas.height;
        imgData[count + 1] = context.getImageData(0, 0, width, height);
    }



}





function canvas_paste() {
    console.log(imgData)
    var context = document.getElementById("myCanvas").getContext('2d');
    context.putImageData(imgData[--count], 0, 0);
    //count--;
}

function pic_cancel() {
    if (count == 0) {
        alert("不能悔棋");
        return;
    }
    var context = document.getElementById("myCanvas").getContext('2d');
    count--
    context.putImageData(imgData[count], 0, 0);
    //canvas_paste();
}

function pic_cancel_cancel() {

    if (list0.length + list1.length <= count) {
        alert("不能撤销悔棋");
        return;
    }
    var context = document.getElementById("myCanvas").getContext('2d');
    count++
    context.putImageData(imgData[count], 0, 0);
}

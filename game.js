
class wrapper {

    constructor() {
        this.ts = new Array();
        this.ts[0]=160;
        this.ts[1]=160;
        this.boat_pos = new Array();

        this.dead_boats = new Array();

        this.popular_array();

        var d = document.getElementById("draw").getContext("2d");

        this.is_player0=true;

        //vertical lines
        d.moveTo(50, 0);
        d.lineTo(50, 200);
        d.moveTo(100, 0);
        d.lineTo(100, 200);
        d.moveTo(150, 0);
        d.lineTo(150, 200);
        //horizontal lines
        d.moveTo(0, 50);
        d.lineTo(200, 50);
        d.moveTo(0, 100);
        d.lineTo(200, 100);
        d.moveTo(0, 150);
        d.lineTo(200, 150);

        d.stroke();

        document.getElementById("pontos0").innerHTML = "player0: "+this.ts[0];
        document.getElementById("pontos1").innerHTML = "player1: "+this.ts[1];
    }

    popular_array() {

        for (var i = 0; i < 3; i++) {
            var seed1 = Math.floor(Math.random() * 4).toString();
            var seed2 = Math.floor(Math.random() * 4).toString();

            //para "garantir" que os barcos não têm posições iguais
            for (var y = 0; y < this.boat_pos.length; y++) {
                while ((this.boat_pos[y].substring(0, 1) == seed1) && (this.boat_pos[y].substring(2, 3) == seed2)) {
                    seed1 = Math.floor(Math.random() * 4).toString();
                    seed2 = Math.floor(Math.random() * 4).toString();
                }
            }

            this.boat_pos[i] = seed1 + "," + seed2;

        }

        for (var yy = 0; yy < this.boat_pos.length; yy++) {
            console.log(this.boat_pos[yy]);
        }
    }

    jogo() {
        if(this.is_player0){
            window.alert("Turno do Jogador 0");
        }else{
            window.alert("Turno do Jogador 1");
        }
        var d = document.getElementById("draw").getContext("2d");

        //vertical lines
        d.moveTo(50, 0);
        d.lineTo(50, 200);
        d.moveTo(100, 0);
        d.lineTo(100, 200);
        d.moveTo(150, 0);
        d.lineTo(150, 200);
        //horizontal lines
        d.moveTo(0, 50);
        d.lineTo(200, 50);
        d.moveTo(0, 100);
        d.lineTo(200, 100);
        d.moveTo(0, 150);
        d.lineTo(200, 150);

        d.stroke();

        document.getElementById("pontos0").innerHTML = "player0: "+this.ts[0];
        document.getElementById("pontos1").innerHTML = "player1: "+this.ts[1];


        var buff = window.prompt();

        if (this.boat_pos.length == 0) {
            //if()
        }

        else {
            //codigo para verificar as posições dos barcos, verifica se no input esta vazio e se o primeiro e 3 caracteres são numeros e contem a ",
            if ((buff.substring(0, 1) >= 0 && buff.substring(0, 1) <= 9) && (buff.substring(2, 3) >= 0 && buff.substring(2, 3) <= 9) && buff.substring(1, 2) == ",") {
                console.log("correct input");


                var boat_rip = false;

                for (var i = 0; i < this.boat_pos.length; i++) {
                    if (this.boat_pos[i] == buff.substring(0, 3)) {
                        console.log("user found boat");

                        boat_rip = true;

                        window.alert("barco was Xau'd");
                        this.dead_boats.push(this.boat_pos[i]);
                        this.boat_pos.splice(i, i + 1);
                        console.log(this.boat_pos.length);

                        i = this.boat_pos.length;
                    } else {
                        boat_rip = false;
                        console.log("wrong coords");
                    }
                }

                if (!boat_rip) {
                    console.log("rip pontos");
                    if(this.is_player0){
                        this.ts[0] -= 10;
                    }else{
                        this.ts[1] -= 10;
                    }

                    document.getElementById("pontos0").innerHTML = "player0: "+this.ts[0];
                    document.getElementById("pontos1").innerHTML = "player1: "+this.ts[1];
                }

            }
        }

        console.log("dead: "+this.dead_boats);

        for(var i=0;i<this.dead_boats.length;i++){
            var img = document.getElementById("alium");
            d.drawImage(img,this.dead_boats[i].substring(0,1)*50,this.dead_boats[i].substring(2,3)*50,50,50);
        }

        //flip players
        this.is_player0=!this.is_player0;
    }
}

thing = new wrapper();
document.getElementById("draw").addEventListener("click", function () { thing.jogo() });
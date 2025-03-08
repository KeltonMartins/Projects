    let calculo = "";
    let contNumsDisplay = 0;
    let eoperavel = false;
    let numPOW = "";
    let decremento = 0;
    let icremento = 64;
    function mostrarNaTela(data){
        const display = document.querySelector('#display');
        const operacao = document.querySelector('#operacao');
        if (data == ".") {
            if (calculo === "") {
                calculo += "0.";
                display.value += "0.";
            } else {
                calculo += ".";
                display.value += ".";
            }
            return;
        }
        if(display.value == "ERRO" && data != "C"){
            return;
        }
        if(data == "<"){
            backSpace();
            return;
        }

        if(display.value === "" && ["÷","x","^","+","%","="].includes(data)){
            return;
        }
        if(display.value === "-" && ["÷","x","^","+","%","=","^"].includes(data)){
            return;
        }
        

        if(["÷", "x"].includes(data)){
            switch (data){
                case "÷":
                    calculo += "/";
                    break;
                case "x":
                    calculo += "*";
                    break;
            }
        }
        if(data == "="){   
            contNumsDisplay = 0;
            operacao.value += display.value + "=";
            resultado(calculo);
            return;
        }
        if(data == "C"){
            clean();
            return;
        }
        if(display.value == "" && data == "-"){
            display.value += data;
            calculo += data
            return;
        }
        
        if(["÷", "x", "^", "-", "+", "%"].includes(data) && display.value != ""){
            icremento = 64;
            contNumsDisplay = 0;
            display.style.fontSize = "64px";
            contNumsDisplay = 0;
            if(data == "^"){
                eoperavel = true;
                contNumsDisplay = 0;
                operacao.value = display.value + data;
                numPOW = display.value;
                display.value = "";
                return;
            }
            if(["÷", "x"].includes(data)){
                eoperavel = true;
                contNumsDisplay = 0;
                operacao.value = display.value += data;
                display.value = "";
                return;
            }
            eoperavel = true;
            contNumsDisplay = 0;
            operacao.value = display.value += data;
            calculo += data;
            display.value = "";
            return;
        }
        
        contNumsDisplay++;
        display.value += data;
        calculo += data
        organizar(contNumsDisplay);
    }
    function organizar(data){
        const display = document.querySelector('#display');
        const operation = document.querySelector('#operacao');
        if(data > 15){
            display.value = "ERRO";
            display.style.fontSize = "64px";
            display.style.color = "rgb(255, 0, 0)";
            document.querySelector('#operacao').value = "";
            return;
        }
        decremento = 8 / (0.5 + data / 8);
        if (data >= 7){
            icremento -= decremento;
            display.style.fontSize = icremento + "px";
        }
    }

    function backSpace(){
        const display = document.querySelector('#display');
        display.value = display.value.slice(0, -1);
        calculo = calculo.slice(0, -1);
        let novoCont = contNumsDisplay - 1;
        if(novoCont < 7){
            icremento = 64;
            display.style.fontSize = icremento + "px";
        } else {
            let incrementoBack = 8 / (0.5 + (novoCont + 1) / 8);
            icremento += incrementoBack;
            display.style.fontSize = icremento + "px";
        }
        contNumsDisplay = novoCont;
    }

    function clean(){
        const display = document.querySelector('#display');
        display.value = "";
        document.querySelector('#operacao').value = "";
        display.style.color = "rgb(255, 255, 255)";
        display.style.fontSize = "64px";
        calculo = "";
        icremento = 64;
        decremento = 0;
        contNumsDisplay = 0;
    }

    function resultado(data){
        const display = document.querySelector('#display');
        let result = "";
        try{
            if(numPOW == ""){
                result = eval(data);
                let resultadoFormatado = result.toLocaleString('pt-BR');
                contNumsDisplay = resultadoFormatado.length
                organizar(format);
                display.value = resultadoFormatado;
            }else{
                let n2 = display.value;
                result = Math.pow(numPOW, n2);
                let resultadoFormatado = result.toLocaleString('pt-BR');
                contNumsDisplay = resultadoFormatado.length
                organizar(format);
                display.value = resultadoFormatado;
                numPOW = "";
            }
        }catch{
            display.value = "ERRO";
            display.style.color = "rgb(255, 0, 0)";
            document.querySelector('#operacao').value = "";
            display.style.fontSize = "64px";
        }
    }
let runningTotal = 0;
let buffer = "0";
let previousOperator;
const result = document.querySelector(".result");
const allNumbers = document.querySelectorAll(".number")
allNumbers.forEach(function (numberNode){
    numberNode.addEventListener("click",function(event){
        console.log("here");
        console.log(event);
        const element = event.target.innerText;
        if(isNaN(+element)){
            console.log("Symbol ",element);
            handleSymbol(element)
        }else{
            console.log("Number ",element);
            handleNumber(element);
        }
        rerender();
    });
});

function rerender(){
    result.innerText = buffer;
}


function handleNumber(value){
    if(buffer === "0"){
        buffer = value;
    }else{
        buffer += value;
    }
}

function handleSymbol(value){
    switch(value){
        case 'C':
            buffer = 0;
            runningTotal= 0;
            previousOperator = null;
            break;
        case "=":
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "<-":
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0,buffer.length -1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}
function handleMath(value){
    const intBuffer = parseInt(buffer);
    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}
function flushOperation(intBuffer){
    if (previousOperator === "+"){
        runningTotal += intBuffer;
    }else if(previousOperator === "-"){
        runningTotal -= intBuffer;
    }else if(previousOperator === "X"){
        runningTotal *= intBuffer;
    }else{
        runningTotal /= intBuffer;
    }
}

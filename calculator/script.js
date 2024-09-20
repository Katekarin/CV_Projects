result = document.getElementById("result")

function Result(){

    number1 = parseFloat(document.getElementById("number-1").value)
    number2 = parseFloat(document.getElementById("number-2").value)
    operation = document.getElementById("operation").value
    console.log(number1 +" "+operation+" "+number2)

    let calculation;

    if (operation === "addition") {
        calculation = number1 + number2;
    } else if (operation === "subtraction") {
        calculation = number1 - number2;
    } else if (operation === "multiplication") {
        calculation = number1 * number2;
    } else if (operation === "division") {
        calculation = number1 / number2;
    }

    document.getElementById("result").textContent = calculation.toFixed(2);


}
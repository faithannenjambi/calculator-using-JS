
const num= document.getElementById('display-screen');

function entry(valueInput)
{
    num.value=num.value+valueInput;
}

function clearScreen()
{
    num.value=" ";
}

function evaluate_valueInput()
{
    try
    {
        num.value=eval(num.value);
    }

    catch
    {
        num.value="Invalid Input!";
    }
}
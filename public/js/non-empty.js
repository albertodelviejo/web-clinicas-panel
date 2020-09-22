function requiredAltaClinica()
{
    for(let i=0;i<8;i++){

    }
var name = document.forms["form1"]["text1"].value;
if (name == "")
{
alert("Please input a Value");
return false;
}
else 
{
alert('Code has accepted : you can try another');
return true; 
}
}
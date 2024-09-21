const baseurl="https://api.currencyapi.com/v3/latest?apikey=cur_live_cbNKHXYSNJ3QhRE8jDsxSmK2ki4jOSU40WRhTYxj";

const dropdown =document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromcurr="USD"; // base currency
const tocurr = document.querySelector(".to select"); 
const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for( let currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value=currcode;
         if(select.name === "to" && currcode === "INR")
                {
                    newOption.selected = "selected";
                }
        select.append(newOption);
    }

    select.addEventListener("change" , (evt) =>{
        updateflag(evt.target);
    }); 
}

const updateflag = (element) => {
    let currcode =element.value;
    let countrycode=countryList[currcode]; // IN ER
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc;
};

btn.addEventListener("click" ,async (evt) => {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval =amount.value;
    console.log(amtval);
    if(amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

 let response =await fetch(baseurl);
 let data =await response.json();  //INR 
 let finalamount="";
for(let key of Object.keys(data["data"]))  // to calculate the final amount after changing the currency
    {  
        if(tocurr.value === key)
        { 
        finalamount =amtval*data["data"][key]["value"];
        console.log("converted amount",finalamount);
        break;
        }
    }
    msg.innerText = `${amtval} ${fromcurr} = ${finalamount} ${tocurr.value}`;
})

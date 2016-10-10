'use strict';
var rows, infoTemplate, template, table, productInfoTags = [], addName;
function productNameByButton(elem) {
    return elem.parentNode.parentNode.children[0].textContent;
}
function doesExistsProduct(prName) {
    var i;
    for (i = 0; i < productInfoTags.length; i += 1) {
        if (productInfoTags[i].textContent.indexOf(prName) !== -1) {
            return i;
        }
    }
    return -1;
}
function addProduct(Name) {
    
    var newtemplate = template.cloneNode(true),
        newInfoTempate = infoTemplate.cloneNode(true),
        addingName = addName.value;
   
    addName.value = "";
    
    if (Name) {
        addingName = Name;
    }
    
    if (!addingName) {
        return false;
    }
    var isClone = doesExistsProduct(addingName);
    if (isClone !== -1) {
        inc(table.children[isClone + 1].children[1].children[2]);
        return;
    }
    
    newtemplate.innerHTML = newtemplate.innerHTML.replace("Nomen", addingName);
    newInfoTempate.innerHTML = newInfoTempate.innerHTML.replace("Nomen", addingName);
    newtemplate.className = "";
    newInfoTempate.className = "";
    newtemplate.removeAttribute("id");
    newInfoTempate.removeAttribute("id");
    rows[1].appendChild(newInfoTempate);
    table.appendChild(newtemplate);
    productInfoTags[productInfoTags.length] = newInfoTempate;
    return 0;
}
function switchInfoTagAmount(name, newAmount) {
    var i;
    for (i = 0; i < productInfoTags.length; i += 1) {
        if (productInfoTags[i].textContent.indexOf(name) !== -1)
            productInfoTags[i].children[0].textContent=newAmount;
    }
    
    return 0;
}
function inc(elem) {
    var numField = elem.parentNode.children[1],
        incBtn = elem.parentElement.children[0];
    
    numField.textContent = parseInt(numField.textContent, 10) + 1;
    switchInfoTagAmount(productNameByButton(elem), numField.textContent);
    if (incBtn.className.indexOf(" disabled") !== -1) {
        incBtn.className = incBtn.className.replace("disabled", "");
    }
    return 0;
}
function dec(elem) {
    var numField = elem.parentNode.children[1],
        currentIntVal = parseInt(numField.textContent, 10);
    if (currentIntVal !== 1) {
        numField.textContent = currentIntVal - 1;
    }
    if ((currentIntVal) === 2) {
        elem.className += " disabled";
    }
    switchInfoTagAmount(productNameByButton(elem), numField.textContent);    
    return 0;
}
function remove(elem) {
    var i;
    for (i = 0; i< productInfoTags.length; i++){
        if (productInfoTags[i].textContent.indexOf(productNameByButton(elem))!==-1){
            productInfoTags[i].parentNode.removeChild(productInfoTags[i]);
            productInfoTags.splice(i,1);
        }
    }
    var parent = elem.parentNode.parentNode;
    parent.parentNode.removeChild(parent);
}
function switchNotDisplayedState(elemArr) {
    var i;
    for (i = 0; i < elemArr.length; i += 1) {
        if (elemArr[i].className.indexOf("notDisplayed") === -1) {
            elemArr[i].className += " notDisplayed";
        } else {
            elemArr[i].className = elemArr[i].className.replace("notDisplayed", "");
        }
    }
}
function setBought(elem) {
    var buttons = elem.parentNode.children;
    switchNotDisplayedState(buttons);
     
    var also = elem.parentNode.parentElement.children[1].children;
    also = [also[0],also[2]];
    switchNotDisplayedState(also);
    
    var pos = doesExistsProduct(productNameByButton(elem));
    rows[1].removeChild(productInfoTags[pos]);
    rows[3].appendChild(productInfoTags[pos]);
    
    productInfoTags[pos].className+=" stressed";
    elem.parentElement.parentNode.children[0].className+=" stressed";
    return 0;
}
function setNotBought(elem) {
    var buttons = elem.parentNode.children;
    switchNotDisplayedState(buttons);
    
    var also = elem.parentNode.parentElement.children[1].children;
    also = [also[0],also[2]];
    switchNotDisplayedState(also);
    
    var pos = doesExistsProduct(productNameByButton(elem));
    rows[3].removeChild(productInfoTags[pos]);
    rows[1].appendChild(productInfoTags[pos]);
    var obj =productInfoTags[pos];
    obj.className=obj.className.replace("stressed", "");
    obj=elem.parentElement.parentNode.children[0];
    obj.className=obj.className.replace("stressed", "");
    return 0;
}

window.onload = function () {
    //document.addEventListener
    
    rows = document.getElementsByClassName("row");
    infoTemplate = document.getElementById("infoTamplate");
    template = document.getElementById("template");
    table = document.getElementsByClassName("productTable")[0];
    addName = document.getElementsByClassName("searchProduct")[0];
        
    addProduct("Помідори");
    addProduct("Печиво");
    addProduct("Сир");
        
    return 0;
};
var body = document.getElementsByTagName('body')[0];
body.style.backgroundColor = getRandomColor();

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// get table from html

var myTable = document.getElementsByTagName('table')[0];
myTable.style.backgroundColor = getRandomColor();
myTable.style.width = '100%';

// get h1 from html
var myH1 = document.getElementsByTagName('h1')[0];
myH1.style.backgroundColor = getRandomColor();
myH1.style.textAlign = 'center';

// get all hr by class name
var myHr = document.getElementsByClassName('myHR');
for (var i = 0; i < myHr.length; i++) {
    myHr[i].style.color = getRandomColor();
    myH1.style.border = '4px solid ' + getRandomColor();
    myHr[i].style.backgroundColor = getRandomColor();
}

// get all  the th by tag name
var myTh = document.getElementsByTagName('th');
for (var i = 0; i < myTh.length; i++) {
    myTh[i].style.backgroundColor = getRandomColor();
    myTh[i].style.color = getRandomColor();
    myTh[i].style.borderColor = getRandomColor();
}


// get all td by tag name


var myTd = document.getElementsByTagName('td');
for (var i = 0; i < myTd.length; i++) {
    myTd[i].style.backgroundColor = getRandomColor();
}


// get footer by tag name
var myFooter = document.getElementsByTagName('footer')[0];
myFooter.style.backgroundColor = getRandomColor();
myFooter.style.color = getRandomColor();



function createBord(xCount, yCount) {
	for (let i = 0; i < xCount; i++) {
		for (let j = 0; j < yCount; j++) {
			let square = document.createElement("div");
			square.className = "square";
			document.getElementById("container").appendChild(square);
		}
	}
}
let value = document.getElementById("scores");
value.className = "value";
let scoresValue = 0;
let x = 10//+prompt("Enter number of columns");
let y = 20//+prompt("Enter number of rows");
document.getElementById("container").style.width = x*24;
document.getElementById("container").style.height = y*24;
document.getElementById("container").className = "container";
createBord(x,y);
let drawnElement = document.getElementsByClassName("square");
let ind = Math.floor(x/2);
let coloredElements = [];
let figures;
document.getElementById("next").style.width = 5*24;
document.getElementById("next").className = "next";
//document.getElementById("next").style.float = "left";
for (let i = 0; i < 5; i++) {
	for (let j = 0; j < 5; j++) {
		let nextsquare = document.createElement("div");
		nextsquare.className = "nextsquare";
		document.getElementById("next").appendChild(nextsquare);
	}
}
let nextElement = document.getElementsByClassName("nextsquare");

function createElement (index, x) {
	figures = [
				[index, index+x, index+2*x, index+3*x, index, index, index+3*x,  
					index, index+1, index+2, index+3, index, index+3, index+3,
					index, index-x, index-2*x, index-3*x, index, index, index,  
					index-3, index-1, index-2, index, index-3, index, index], //I 0
				[index, index+x, index+x+1, index+x+2, index, index+2, index+2+x,
					index, index+1-x, index+1-2*x, index+1, index, index+1, index+1,
					index-x-2, index-x-1, index-x, index, index-2, index, index,
					index-1+2*x, index-1+x, index-1, index, index-1, index, index-1+2*x], //L 1
				[index+x-2, index, index+x-1, index+x, index-2, index, index+x, 
					index, index+1, index+1+x, index+1+2*x, index, index+1, index+1+2*x,
					index, index-x, index-x+1, index-x+2, index, index+2, index, 
					index-1-2*x, index-1, index-1-x, index, index-1, index, index], //J 2
				[index, index+1, index+x, index+x+1, index, index+x+1, index+x+1], //O 3
				[index+x-1, index, index+x, index+x+1, index-1, index+1, index+x+1,
					index, index+1-x, index+1, index+1+x, index, index+1, index+1+x,
					index-1-x, index, index-x, index-x+1, index-1, index+1, index, 
					index-1, index-1-x, index-1+x, index, index-1, index, index-1+x], //T 4
				[index, index+1, index+x+1, index+x+2, index, index+2, index+x+2, 
					index, index-x, index-x+1, index-2*x+1, index, index+1, index,
					index, index-1, index-1-x, index-2-x, index-2, index, index,
					index, index+x, index+x-1, index+2*x-1, index-1, index, index+2*x-1], //Z 5
				[index, index-1, index+x-1, index+x-2, index-2, index, index+x-2,
					index, index+x, index+x+1, index+2*x+1, index, index+1, index+2*x+1,
					index, index+1, index+1-x, index+2-x, index, index+2, index,
					index, index-x, index-x-1, index-2*x-1, index-1, index, index ] //S 6
			]
	return figures[Math.floor(Math.random() * figures.length)];
	//return figures[6];	
}

let nextArray =  createElement(2, 5);
let nextIndex = figures.indexOf(nextArray);
let currentArray =  createElement(ind, x);
colorNext(nextArray);
function getMinIndex (array, ind1, ind2) {
	let min = array[ind1];
	for (let i = ind1; i < ind2; i++) {
		if (array[i] < min) {
			min = array[i];
		}
	}
	return min;
}
function color (array) {
	for (let i = 0; i < 4; i++) {
			let currentIndex = array[i];
			drawnElement[currentIndex].style.backgroundColor = "aquamarine";
	}
}
function colorNext (array) {
	for (let i = 0; i < 4; i++) {
			let currentIndex = array[i];
			nextElement[currentIndex].style.backgroundColor = "aquamarine";
	}
}
function removeColorNext (array) {
	for (let i = 0; i < 4; i++) {
		let currentIndex = array[i];
		nextElement[currentIndex].style.backgroundColor = "gray";
	}
}
function colorDown (array) {
	for (let i = 0; i < array.length; i++) {
			let currentIndex = array[i];
			drawnElement[currentIndex].style.backgroundColor = "cadetBlue";
	}
}
color(currentArray);

function removeColor (array) {
	for (let i = 0; i < 4; i++) {
		let currentIndex = array[i];
		drawnElement[currentIndex].style.backgroundColor = "black";
	}
}

function roteteArr(arr, index, N) {
    if (index<arr.length) {
      arr[index]=arr[index+N];
      roteteArr(arr, index+1, N)
    }
  return arr;
}

function sliceElm (arr, index, N) {
    let temp=arr.slice(index, N);
    return temp;
}


window.addEventListener("keydown", move, false);

function move(event) {
	if (event.keyCode == 37) {
		left(drawnElement)
	}
	else if (event.keyCode == 39) {
		right(drawnElement)
	}
	else if (event.keyCode == 40) {
		down(drawnElement)
	}
	else if (event.keyCode == 38) {
		rotate(drawnElement)
	}
	else if (event.keyCode == 32) {
		r()
	}
}
function stepcheck(array1, array2, step) {
	let checkValue = true;
	for (let i = 0; i < 4; i++) {
		if (array2.indexOf(array1[i]+step) !== -1) {
			checkValue = false;
			break;
		}
	}
	return checkValue;
}
function rotateCheck (array1, array2) {
	let checkValue = true;
	for (let i = 7; i < 11; i++) {
		if (array2.indexOf(array1[i]) !== -1) {
			checkValue = false;
			break;
		}
	}
	return checkValue;	
}
function fullrow () {
	for (let i = x*y-1; i >= 0; i-= x) {
		let checkValue = true;
		for (let j = i; j > i-x; j--) {
			if (coloredElements.indexOf(j) == -1) {
				checkValue = false;
				break;
			}
		}
		if (checkValue) {
			let removeIndex = coloredElements.indexOf(i-x+1);
			removeelement(coloredElements, removeIndex, x);
			for (let k = i; k > i-x; k--) {
				drawnElement[k].style.backgroundColor = "black";
			}
			for (let l = 0; l < removeIndex; l++) {
			coloredElements[l] = coloredElements[l]+x;
			}
			colorDown(coloredElements);
			for (let m = 0; m < x*y; m++) {
				if (coloredElements.indexOf(m) == -1) {
					drawnElement[m].style.backgroundColor = "black";
				}
			}
			scoresValue = scoresValue + 20;
			value.innerText = "Scores: "+scoresValue;
		}
	}
}
function removeelement (array, index, qty) {
	array.splice(index, qty)
}
function  left() {
	if ((currentArray[4])%x !==0 && currentArray[4] !== 0 && stepcheck(currentArray, coloredElements, -1)) {
		removeColor(currentArray);
		for (let i = 0; i < currentArray.length; i++) {
		currentArray[i] = currentArray[i]-1;
		}
		for (let i = 0; i < 4; i++) {
		drawnElement[currentArray[i]].style.backgroundColor = "aquamarine";
		}
	}
}
function  right() {
	if ((currentArray[5]+1)%x !==0 && stepcheck(currentArray, coloredElements, 1)) {
		removeColor(currentArray);
		for (let i = 0; i < currentArray.length; i++) {
			currentArray[i] = currentArray[i]+1;
		}
		for (let i = 0; i < 4; i++) {
			drawnElement[currentArray[i]].style.backgroundColor = "aquamarine";
		}
	}
}
function  down() {
	if (currentArray[6] < x*y-x && stepcheck(currentArray, coloredElements, x)) {
		removeColor(currentArray);
		for (let i = 0; i < currentArray.length; i++) {
			currentArray[i] = currentArray[i]+x;
		}
		for (let i = 0; i < 4; i++) {
			drawnElement[currentArray[i]].style.backgroundColor = "aquamarine";
		}
	}
	else {
		for (let i = 0; i < 4; i++) {
			coloredElements.push(currentArray[i]);
		}
		colorDown(coloredElements);
		coloredElements.sort(function(a,b) {return a-b})
		createElement(ind, x);
		currentArray = figures[nextIndex];
		color(currentArray);
		removeColorNext(nextArray);
		nextArray =  createElement(2, 5);
		nextIndex = figures.indexOf(nextArray);
		colorNext(nextArray);
		fullrow();
		fullrow();
		fullrow();
		let minValue = getMinIndex(coloredElements, 0, coloredElements.length);
		if (minValue <= x-1) {
			createElement(ind, x);
			currentArray = figures[nextIndex];
			document.getElementById("container").innerText = "Game over!!!";
		}
	}
}
function rotate() {
	let rotatecheckRight = Math.floor(currentArray[5]/x)*x+x;
	let rotatecheckLeft = Math.floor(currentArray[4]/x)*x;
	let minIndex = getMinIndex(currentArray, 7, 11);
	if (rotatecheckLeft <= currentArray[11] && rotatecheckRight > currentArray[12] && currentArray[13] <= x*y && rotateCheck(currentArray, coloredElements) && currentArray[14] > 0 && minIndex > 0) {
		removeColor(currentArray);
		let length=currentArray.length
  		let temp=sliceElm(currentArray, 0, 7)
  		roteteArr(currentArray, 0, 7);
  		currentArray.length=length-7;
  		currentArray.push(...temp);
  		color(currentArray);
	}
}

document.getElementById("start").onclick = function() {
    setInterval(down, 1300)
}








var x             = 'x';
var theTextBox    = document.getElementById('enteredText'); 
var allTheKeys    = document.getElementById('key-items'); 
var changeKeys    = document.getElementsByClassName('keyboard-key'); 
var capsLockKey   = document.getElementById('20');
var shiftKey      = document.getElementById('16');
var rShift        = document.getElementById("rightShift");
var rAlt          = document.getElementById("rightAlt");
var cursor        = document.getElementById("cursor");

//Store all the original values of the non-alphabetical keys
var originalShifterArray = []; 
for (i = 0; i<changeKeys.length; i++){
	originalShifterArray.push(changeKeys[i].innerHTML);
}

//Set up an array for the replacement values of the non-alphabetical keys that get subbed in when Shift is pressed
var shifterArray = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'];

//Function that clears the text box
function clearText(){
	theTextBox.innerHTML = '<br>';
}

//Function that detects keypresses and does the appropriate things
function highlightAndType(e){
	event.preventDefault();
	var keyPressed = e.keyCode;
	var charPressed = e.key;
	const keys = document.getElementById(keyPressed);

	if(e.location ==2 && e.key == 'Shift'){
		rShift.classList.add('pressed');
	}
	else if(e.location ==2 && e.key == "Alt"){
		rAlt.classList.add('pressed');
	}
	else{
		keys.classList.add('pressed');
	}
	

	for(var i = 0; i < document.getElementsByClassName('pressed').length;i++){
		pr = document.getElementsByClassName('pressed')[i].nextSibling;
		pr.nextSibling.classList.add('key-text-dislocation');
	}
	

	if(!charPressed){
		theTextBox.innerHTML = "Sorry, this project doesn't work in your browser. :( <br> Try Chrome, Firefox or Opera.";
		return;
	}

	//Make sure the key that was typed was a character
	if (e.key.length <= 1){
		if(theTextBox.innerHTML.endsWith('<br>')){
			var newText = theTextBox.innerHTML.slice(0, -4);
			theTextBox.innerHTML = newText;
		}
		theTextBox.value += e.key;
	//If a backspace was typed, delete the last character in the text box. If shift was also held, delete all text.
	} else if (e.key == 'Backspace'){
		if(shiftKey.classList.contains('pressed')){
			clearText();
		} else {
			var newText = theTextBox.value.slice(0, -1);
			theTextBox.value = newText;
		}
	//If the Enter key was typed, remove all text from the text box
	} 
	// else if (e.key == 'Enter'){
	// 	theTextBox.innerHTML += '<br><br>';
	// }
	//if Tab is pressed, don't tab out of the window. Add extra space to the text box instead
	if(keyPressed == 9){
		e.preventDefault();
		theTextBox.innerHTML += '&emsp;&emsp;';
	}
}

//Function that detects when the user lets off a key and does the appropriate things
function removeKeypress(e){
	var keyDepressed = e.keyCode;	
	const keys = document.getElementById(keyDepressed);
	
	keys.classList.remove('pressed');
	rShift.classList.remove('pressed');
    rAlt.classList.remove('pressed');

	pr = keys.nextSibling;
	pr.nextSibling.classList.remove('key-text-dislocation');
	rShift.nextSibling.nextSibling.classList.remove('key-text-dislocation');
	rAlt.nextSibling.nextSibling.classList.remove('key-text-dislocation');

	//If Shift was just let off, replace all non-alphabetical keys with their original values rather than their shifted values
	if(keyDepressed == 16 ) {
		for(i = 0; i<changeKeys.length; i++){
			changeKeys[i].innerHTML = originalShifterArray[i];
		}
	}
}

window.addEventListener('keydown', highlightAndType );

window.addEventListener('keyup', removeKeypress );

document.getElementById('enteredText').addEventListener('click', clearText );



var mouseX = 0, mouseY = 0, limitX = 968-15, limitY = 549-15;
window.onmousemove = function(e){
	var offset = document.getElementsByClassName('display-output')[0].getBoundingClientRect();
	var top =  offset.top + document.body.scrollTop;
	var left = offset.left + document.body.scrollLeft;
	mouseX = Math.min(e.pageX - left, limitX);
	mouseY = Math.min(e.pageY - top, limitY);
	if (mouseX < 0) mouseX = 0;
	if (mouseY < 0) mouseY = 0;
};

// cache the selector
var xp = 0, yp = 0;
var loop = setInterval(function(){
     // change 12 to alter damping higher is slower
     xp += (mouseX - xp) / 1;
     yp += (mouseY - yp) / 1;
     cursor.style.left = xp + "px";
     cursor.style.top = yp + "px";
 }, 5);

document.getElementsByClassName('login-wrap')[0].onmouseover = function(e){ cursor.classList.add("hide");};
document.getElementsByClassName('login-wrap')[0].onmouseout = function(e){ cursor.classList.remove("hide");};


document.getElementsByClassName('login-btn')[0].onclick = function(e) {
	if(document.getElementById('enteredText').length > 0){
		console.log(1) //todo
	}
}


setInterval(function(){
   var date = new Date();
   var time = {
               hour: (function(){
                  var pm,am;
                 if(date.getHours() > 13 && date.getHours() < 23){
                   return {current:date.getHours()-12, AmPm:"pm"}
                 }
                 if(date.getHours()===0){
                   return {current:date.getHours()+12, AmPm:"am"}
                 }
                 if(date.getHours()===12){
                   return {current:date.getHours(), AmPm:"pm"}
                 }
                  return {current:date.getHours(), AmPm:"am"}
               }()),

               minute:date.getMinutes(),
               day:data.getDay(date.getDay()),
               date:date.getDate(),
               month:data.getMonth(date.getMonth())
            };

            document.querySelector(".time").innerHTML= time.hour.current+":"+time.minute+" "+time.hour.AmPm;
            document.querySelector(".date").innerHTML = time.day+", "+time.month+" "+time.date;

},1000);

var data = {
   getDay : function(par){
      var Days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
      return Days[par-1];
   },
   getMonth: function(par){
      var Months = ["january","febrary","march","april","june","july","agoust",
                     "september","october","november","december"];
                     return Months[par-1];
   }
};

var child = document.querySelector(".time-screen");


['click', 'keydown', 'keypress'].map(function(e) {
	window.addEventListener(e, function(e){
		if(document.querySelector(".time-screen").contains(child)==true)
		console.log(e)
		child.classList.add('hide-to-top')
		document.querySelector(".display-output-bg").classList.add('zoomed');
		document.querySelector(".login-page").classList.remove('hide');
	});
});

	//child.classList.addClass('hide')


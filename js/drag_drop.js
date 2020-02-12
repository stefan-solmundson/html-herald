// called by "dragover" & "drop"
function addEvent(event, elem, fxn) {
	// addEventListener returns false if no addEventListener exists
	if (elem.addEventListener) {
	elem.addEventListener(event, fxn, false);
	} 
	// attachEvent returns if no attachEvent exists
	else if (elem.attachEvent) {
		elem.attachEvent('on' + event, fxn);
	} 
	// if both an eventListener & attachEvent exist on the element?
	// then adds the event listeners "ondragover" and "ondrop" to the cat image
	else {
		elem['on' + event] = fxn;
	}
}

// bind the dragstart event on the mice  
var mice = document.querySelectorAll('#mouseContainer img');
var mouse = null;
for (var i=0; i < mice.length; i++) {
	mouse = mice[i];
	mouse.addEventListener('dragstart', function (event) {
		event.dataTransfer.setData('text/plain', this.id); 
	});
}

// bind the dragover event on the cat
var cat = document.getElementById('cat');
addEvent('dragover', cat, function(event) {
	event.preventDefault();
});

// bind the drop event on the cat
addEvent('drop', cat, function(event) {
	// this is like an enumerated array
	// you use "mouse1", "mouse2", "mouse3" to access the elements
	var mouseHash = {
		mouse1: 'NOMNOMNOM',
		mouse2: 'Mreow',
		mouse3: 'Purrrrrr...'
	};
	
	// change text of the header based on which mouse was dropped
	var mouseID = event.dataTransfer.getData('text/plain');
	
	// mouseID == ???
	var ch = document.getElementById('catHeading');
	ch.innerHTML = mouseHash[mouseID];
	// this displays "mouse1", "mouse2", "mouse3" in the console the enum names
	console.dir(mouseID);

	// get the img element for the mouse, and then remove it
	var mousey = document.getElementById(mouseID);
	mousey.parentNode.removeChild(mousey);

	event.preventDefault();  
});


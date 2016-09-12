$(document).ready(function(){
	$('.powered-by-firepad').remove();

	$('#menu-toggle').click(function(){
		$('.ui.labeled.icon.sidebar')
			.sidebar({
				dimPage: false
			})
			.sidebar('toggle');
	});

	$("[data-dock-parent]").each(function() {
        el = $(this);
       	parent = $(el.data('dock-parent'));
       	el.height(parent.height());
    });
});


//Firebase config
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyAVTHDWZp9vPdDZIrNDBzBUw4GYJOTrhrU",
    authDomain: "siri-nova.firebaseapp.com",
    databaseURL: "https://siri-nova.firebaseio.com",
    storageBucket: "siri-nova.appspot.com",
  };
// Helper to get hash from end of URL or generate a random one.
function getFirePadExampleRef() {
  var ref = firebase.database().ref('firepad');
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  return ref;
}

//Export PDF with jsPDF
function exportHTMLToPDF(firepad){
	var doc = new jsPDF('p', 'pt', 'letter');
	margins = {
	    top: 80,
	    bottom: 60,
	    left: 40,
	    width: 522
	  };
	// All units are in the set measurement for the document
	// This can be changed to "pt" (points), "mm" (Default), "cm", "in"
	doc.fromHTML(firepad.getHtml(), margins.left, margins.top, {
			'width': margins.width
		},
		function(dispose){
			doc.save('Test.pdf');
		}),margins;
}


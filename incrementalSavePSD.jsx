#target photoshop
/*
	Script written by ato
	http://xn-to-uia.com/
	Do what you want with it
	I am not responsible for anything
*/


//Get the Active Document
var doc = app.activeDocument;
// Define de leading Zeros. For Example: 3 = "001"
var zeroes = 3;

// Define the Seperator: For Example bla--001.psd
var seperator= "--"

var len = -(zeroes+seperator.length);


function isDocumentNew(doc){
	// A Function that checks if doc has been saved.
	// assumes doc is the activeDocument
	cTID = function(s) {
		return app.charIDToTypeID(s);
	}

	var ref = new ActionReference();
	ref.putEnumerated( cTID("Dcmn"),
	cTID("Ordn"),
	cTID("Trgt") ); //activeDoc
	var desc = executeActionGet(ref);

	var isNew = true;
	if (desc.hasKey(cTID("FilR"))) { //FileReference
		var path = desc.getPath(cTID("FilR"));
			if (path) {
				isNew = (path.absoluteURI.length == 0);
			}
		}
	return isNew;
};


function zeroPad(num, digit ){
	// A Function that adds Leading Zeros
	var string = num.toString();
	while (string.length < digit){ 
		string = "0" + tmp;
	}
	return tmp;
}

function CreateUniqueFileName(inFolder, inFileName, inExtension){
	// A Function that Checks for existing files and increments if necessary
	// Input: given a folder, file name and extenstion
	var uniqueFileName = inFolder + "/"+ inFileName.replace(/(--\d+)(?![\s\S])/,"") + inExtension;
	var fileNumber = 1;
	while ( File( uniqueFileName ).exists) {

		uniqueFileName = inFolder + "/" + inFileName.replace(/(--\d+)(?![\s\S])/,"") + seperator + zeroPad(fileNumber, zeroes) + inExtension;
		fileNumber++;
	}
	// Return the full path to the unique file
	return uniqueFileName;
}

function savePSD(){
	// A Function that saves a PSD
	psdSaveOptions = new PhotoshopSaveOptions();
	psdSaveOptions.embedColorProfile = true;
	psdSaveOptions.alphaChannels = true; 
	psdSaveOptions.layers = true; 
	var namey = doc.name.replace(/\.[^\.]+$/, '');
	var ext = doc.name.split('.').pop();
	var uniquePath = CreateUniqueFileName(doc.path, namey, "."+ext);
	var path = File(uniquePath);
	doc.saveAs(path, psdSaveOptions, false, Extension.LOWERCASE);
	var filename = uniquePath.split("/").pop();
	alert("Saved as " + filename);
}

// Check if File has been Saved and run the whole thing
if (isDocumentNew(doc)){
	alert("Save it first");
}else{
	savePSD();
}
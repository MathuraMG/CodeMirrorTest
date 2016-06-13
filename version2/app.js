var isLightTheme = 1;
var isTextArea = 1;

var myCodeMirror;

// let's save this as a globally accessible variable in case we need it for more custom style functions
var cmWrapperElement;

// debugger;
window.onload = function(){

  myCodeMirror = CodeMirror.fromTextArea(document.getElementById('codemirror-test'), {
    value: "console.log('potato')\n",
    mode:  "javascript",
    lineNumbers: true,
    theme: "3024-day",
    autoCloseBrackets: true,
    inputStyle: "contenteditable"
  });

  isTextArea = 0;
  cmWrapperElement = myCodeMirror.getWrapperElement();

  codeArea =document.getElementsByClassName('CodeMirror')[0];
  codeArea.addEventListener("keyup", function() {
    console.log('changing the value');
    eval(myCodeMirror.doc.getValue());
    // eval(textAreaCM.doc.getValue());
  })

  setIDETheme();

  //add content editable to the parent class - 'CodeMirror-lines'
  // document.getElementsByClassName('CodeMirror-lines')[0].contentEditable = true;

}

/******* ADDED EDITOR FUNCTIONALITES *********/

myCodeMirror.setOption("extraKeys", {
  'Ctrl-L': function(cm) {
    document.getElementById('noOfLines').innerHTML = 'no of lines - ' + myCodeMirror.lineCount();
  }
});

/******* UTILITIES *********/

function toggleTheme() {
  if(isLightTheme == 1) {
    myCodeMirror.setOption('theme','3024-night');
    isLightTheme = 0;
  }
  else {
    myCodeMirror.setOption('theme','3024-day');
    isLightTheme = 1;
  }
}

function setFontSize() {
  var fontSize = document.getElementById('fontSize').value;
  cmWrapperElement.style['font-size'] = fontSize;
}

function setIDETheme() {
  var selTheme = document.getElementById('ideTheme').value;
  myCodeMirror.setOption('theme',selTheme);
}

function switchToText() {
  if(isTextArea === 0 ){
    console.log('switch to text area');
    myCodeMirror.toTextArea();
    isTextArea = 1;
  }
  else {
    console.log('switch to text area');
    myCodeMirror = CodeMirror.fromTextArea(document.getElementById('codemirror-test'), {
      mode:  "javascript",
      lineNumbers: true,
      theme: document.getElementById('ideTheme').value,
      autoCloseBrackets: true,
      inputStyle: "contenteditable"
    });
    isTextArea = 0;
  }

}

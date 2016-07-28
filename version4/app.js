var App = (function() {

  var App = function() {
    this.isTextArea = 0;
    this.fontSizeSelector = document.getElementById('fontSize');
    this.themeSelector = document.getElementById('ideTheme');
    this.textareaSelector = document.getElementById('textareaSelector');
    this.editorArea = document.getElementById('overall-editor');
    this.lineIndicator = document.getElementById('lineNo');
    this.textArea = document.getElementById('codemirror-text');
    this.codeMirror = CodeMirror.fromTextArea(document.getElementById('codemirror-text'), {
      mode:  'javascript',
      lineNumbers: true,
      theme: document.getElementById('ideTheme').value,
      autoCloseBrackets: true,
      inputStyle: 'contenteditable'
    });
    document.getElementsByClassName('lines')[0].style.display = 'none';
    // these will be set in the init() function
    this.codeArea = null;
    this.cmWrapperElement = null;

    this.init();
  };

  App.prototype.constructor = App;

  App.prototype.init = function() {
    var self = this;

    self.codeArea = document.getElementsByClassName('CodeMirror')[0];
    self.cmWrapperElement = self.codeMirror.getWrapperElement();

    self.codeMirror.setOption("extraKeys", {
      'Ctrl-L': function(cm) {
        document.getElementById('noOfLines').innerHTML = 'no of lines - ' + self.codeMirror.lineCount();
      }
    });

    self.bindHandlers();
  };

  App.prototype.bindHandlers = function() {
    var self = this;

    // The functions below are being bound to
    // DOM elements, so in their scope 'this' will
    // refer to the element itself; within
    // the event handlers, we will refer to the
    // global 'app' variable. A little weird
    // but it works ¯\_(ツ)_/¯

    var keyup = function() {
      var value = app.codeMirror.doc.getValue();
      eval(value);
    };

    var setFontSize = function() {
      var fontSize = this.value;
      app.cmWrapperElement.style['font-size'] = fontSize;
    };

    var setTheme = function() {
      var theme = this.value;
      app.codeMirror.setOption('theme', theme);
    };

    var toggleTextarea = function() {
      if(self.isTextArea === 0 ){
        console.log('switch to text area');
        self.codeMirror.toTextArea();
        self.isTextArea = 1;
        document.getElementsByClassName('lines')[0].style.display = 'block';
        document.getElementsByClassName('lines')[0].tabindex = -1;
        self.textareaSelector.innerHTML = 'switch to codemirror';
      }
      else {
        console.log('switch to codemirror area');
        self.codeMirror = CodeMirror.fromTextArea(document.getElementById('codemirror-text'), {
          mode:  "javascript",
          lineNumbers: true,
          theme: document.getElementById('ideTheme').value,
          autoCloseBrackets: true,
          inputStyle: "contenteditable",
        });
        self.isTextArea = 0;
        document.getElementsByClassName('lines')[0].style.display = 'none';
        self.textareaSelector.innerHTML = 'switch to textarea';
      }
    }

    var getLineNumber = function() {
      if(self.isTextArea == 0) {
        self.lineIndicator.innerHTML = 'line ' + parseInt(parseInt(self.codeMirror.getCursor().line)+1);
      } else {
        self.lineIndicator.innerHTML = 'line ' + self.textArea.value.substr(0,self.textArea.selectionStart).split("\n").length;
      }

    }

    self.codeArea.addEventListener('keyup', keyup);
    self.fontSizeSelector.addEventListener('change', setFontSize);
    self.themeSelector.addEventListener('change', setTheme);
    self.textareaSelector.addEventListener('click',toggleTextarea);
    self.editorArea.addEventListener('keyup',getLineNumber);
  };

  return App;
})();

var app;
window.onload = function() {
  app = new App();
};

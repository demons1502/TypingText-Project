var eventsModule = (function(dModule, uModule, cModule, wModule){
    var addEventListeners = function(){

        //enter click event

        uModule.getDOMElements().textInput.addEventListener('keydown', function(event){
            if(dModule.testEnded()){
                return;
            }

            //check if user press Enter
            var key = event.keyCode;
            if(key == 13){
                uModule.getDOMElements().textInput.value += dModule.getLineReturn() + ' ';

                //create a new input event
                var inputEvent = new Event('input');
                //dispatch it
                uModule.getDOMElements().textInput.dispatchEvent(inputEvent);
            }

        });

        //character typing event listener
        uModule.getDOMElements().textInput.addEventListener('input', function(event){
            //if the test end , do nothing
            if(dModule.testEnded()){
                return;
            }
            //if the test not starting yet , start the test and countdown
            if(dModule.testStarted()){
                // start the test

            }

            // get typed word : UI model
            var typedWord = uModule.getTypedWord();
            //update current word: data model
            dModule.updateCurrentWord(typedWord);
            //format the active word
            var currentWord = dModule.getCurrentWord();
            uModule.formatWord(currentWord);
            //check if user press space or enter
            if(uModule.spacePressed(event) || uModule.enterPressed(dModule.getLineReturn())){

                //empty text input
                uModule.emptyInput();

                //deactivate current word
                uModule.deactivateCurrentWord();
                //move to a new word: data Module
                dModule.moveToNewWord();
                //set active Word: UI Module
                var index = dModule.getCurrentWordIndex();
                uModule.setActiveWord(index);
                //format the active word: UI Module
                var currentWord = dModule.getCurrentWord();
                uModule.formatWord(currentWord);

                // scroll word into the middle view
                uModule.scroll();
            }
        });
        //click on download button event listener

    };

    //Scroll into middle view on window resize
    window.addEventListener('resize', uModule.scroll())


    return {
        //init function, initializes the test before start
        init: function(duration, textNumber){

            //fill the list of test words: data Module

            var words = wModule.getWords(textNumber);
            dModule.fillListOfTestWords(textNumber, words);

            //fill the list of test words: UI
            var lineReturn = dModule.getLineReturn();
            var testWords = dModule.getListofTestWords();
            uModule.fillContent(testWords, lineReturn);

            //set the total test time
            dModule.setTestTime(duration);

            //update time left: data Module
            dModule.initializeTimeLeft();

            //update time left: UI module
            var timeLeft = dModule.getTimeLeft();
            uModule.updateTimeLeft(timeLeft);

            //move to a new word: data Module
            dModule.moveToNewWord();
            //set active Word: UI Module
            var index = dModule.getCurrentWordIndex();
            uModule.setActiveWord(index);
            //format the active word: UI Module
            var currentWord = dModule.getCurrentWord();
            uModule.formatWord(currentWord);

            //focus on text input: UI Module
            uModule.inputFocus();

            //add avent listeners
            addEventListeners();
        }
    };


})(dataModule, UIModule, certificateModule, wordsModule);
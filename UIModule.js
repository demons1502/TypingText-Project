var UIModule = (function(){
    //classes used to select HTML elements
    var DOMElements = {
       //indicators - test control
        timeLeft: document.getElementById('timeLeft'), //HTML element displaying time left
        //test results
        wpm: document.getElementById('wpm'),
        wpmChange:document.getElementById('wpmChange'),
        cpm: document.getElementById('cpm'),
        cpmChange: document.getElementById('cpmChange'),
        accuracy: document.getElementById('accuracy'),
        accuracyChange: document.getElementById('accuracyChange'),
        //user input
        textInput: document.querySelector('#input'),
        nameInput: document.querySelector('.form-group'),
        //test words
        content:document.getElementById('content'),
        activeWord:'',
        //modal
        modal: $('#myModal')
    };

    var splitArray = function(string){
        return string.split('');
    };

    var addSpace = function(array){
        array.push(' ');
        return array;
    };

    var addSpanTags = function(array){
        return array.map(function(currentCharacter){
            return '<span>'+currentCharacter+'</span>'
        });
    };

    var addWordSpanTags = function(array){
        array.push('</span>');
        array.unshift('<span>');
        return array;
    };

    var joinEachWord = function(array){
        return array.join('');
    }
    var userValue;
    var returnCharClass = function(currentCharacter, index){
                return (index < userValue.length)? (currentCharacter == userValue[index]? 'correctCharacter': 'wrongCharacter') : '0'
            };
    return {

    //get DOM elements

        getDOMElements: function(){
            return {
                textInput: DOMElements.textInput
            };
        },

    //Indicators - Test Control

        updateTimeLeft: function(x){
            DOMElements.timeLeft.innerHTML = x;
        },

    //results

        updateResults: function(){},

        fillModal: function(){},

        showModal: function(){},

    //user input

        inputFocus: function(){
            DOMElements.textInput.focus();
        },

        isNameEmpty: function(){},

        flagNameInput: function(){},

        spacePressed: function(event){
            return event.data == " ";
        },

        enterPressed: function(lineReturn){
            return DOMElements.textInput.value.includes(lineReturn + ' ');
        },

        emptyInput: function(){
            DOMElements.textInput.value = "";
        },

        getTypedWord: function(){
            return DOMElements.textInput.value;
        },

    //test words

        fillContent: function(array, lineReturn){
            //['word1,','word2']
            var content = array.map(splitArray);
            // console.log(content);
            content = content.map(addSpace);
            // console.log(content);

            content = content.map(addSpanTags);
            // console.log(content);

            content = content.map(addWordSpanTags);
            // console.log(content);

            content = content.map(joinEachWord);
            // console.log(content);

            content = content.join(' ');
            // console.log(content);

            // content = content.replace('<span>|</span>','<span>&crarr;</span>');
            content = content.split('<span>'+ lineReturn+ '</span>').join('<span>&crarr;</span>');
            // console.log(content);
            //Fill content
            DOMElements.content.innerHTML = content;

        },

        formatWord: function(wordObject){
            var activeWord = DOMElements.activeWord;

            activeWord.className = 'activeWord';

            var correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;

            // correct value 'word1'
            // user value 'wwrd'


            var classes = Array.prototype.map.call(correctValue, returnCharClass);

            // get active word
            var activeWord = DOMElements.activeWord;

            // HTML collection
            var characters = activeWord.children;

            // add classes to children
            for(var i=0; i < characters.length; i++) {
                characters[i].className = classes[i];
            }

        },

        setActiveWord: function(index){
            DOMElements.activeWord = DOMElements.content.children[index];
        },

        deactivateCurrentWord: function(){
            DOMElements.activeWord.removeAttribute('class');
        },

        scroll: function(){
            var activeWord = DOMElements.activeWord;
            var top1 = activeWord.offsetTop;
            var top2 = DOMElements.content.offsetTop;
            var diff = top1 - top2 ;
            // scroll the content
            DOMElements.content.scrollTop = diff - 40;
        }

    }
})();
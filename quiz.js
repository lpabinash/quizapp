var quizlistfrombackend=[];
var ans=[];
var mark=0;


function generatequizitem(Obj){

            var maindiv=document.createElement('div');
            maindiv.className='maindiv';

            var question=document.createElement('h3');
            question.innerHTML='Q' + Obj.id + '.' + Obj.question;
            maindiv.appendChild(question);
            
            for(var i=0;i<Obj.options.length;i++){
                var optiondiv=document.createElement('div');
                optiondiv.classname='padding';
                maindiv.appendChild(optiondiv);
                var optionwrapper=document.createElement('label');
                var radiobutton=document.createElement('input');
                radiobutton.className='options';
                radiobutton.type='radio';
                radiobutton.name='question'+Obj.id;
                radiobutton.value=Obj.options.indexOf(Obj.options[i]) + 1;
                optionwrapper.appendChild(radiobutton);
                var label=document.createTextNode(Obj.options[i]);
                optionwrapper.appendChild(label);
                optiondiv.appendChild(optionwrapper);
             }
                
            return maindiv;

}

var quizForm=document.getElementById('quizform');



var xhttp = new XMLHttpRequest();
xhttp.open('GET', 'http://5d76bf96515d1a0014085cf9.mockapi.io/quiz', true);
xhttp.onreadystatechange = function() {
            if(this.readyState === 4) {
                    quizlistfrombackend=JSON.parse(this.responseText);
                    for(var i=0;i<quizlistfrombackend.length;i++){

                        quizForm.insertBefore(generatequizitem(quizlistfrombackend[i],i),quizForm.lastElementChild);
                        ans.push(quizlistfrombackend[i].answer);
                    }
                    

            }
        }
xhttp.send();

quizForm.addEventListener('submit',function(e){
    e.preventDefault();
   
    inputelement=this.querySelectorAll('input[type=radio]');
    for(var i=0;i<inputelement.length;i++){
        if(inputelement[i].checked){
            var id=parseInt(inputelement[i].name.slice(8));
            var optionid=parseInt(inputelement[i].value);
        
            for(var j=0;j<quizlistfrombackend.length;j++){
                
                if(quizlistfrombackend[j].id===id){
                    quizlistfrombackend[j]['selectedOption']=optionid;
                    
                    
                }
               
            }
            
        }
    }
    
    for (var i = 0; i < quizlistfrombackend.length; i++) {
        if (ans[i] === quizlistfrombackend[i].selectedOption) {
          mark = ++mark;
        } else {
          mark;
        }
      }
      var resultPage = document.getElementById('result-page');
      resultPage.onclick=function(){
        location.reload();
      }
    var result = document.getElementById('result');
    result.innerText = mark + "/" + ans.length;
    resultPage.style.display = "block";
    submit.style.display = 'none';
})


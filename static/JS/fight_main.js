// some work should be done in this to adjust number of questions accordingly. for example if both questions are for adults.
const totalQuestions = Object.keys(QUESTIONS).length // Get length of object (quite annoying)
const ANSWERS = {}
const POINTS = {
    'm0': {},
    'm1': {}
}
let current_q = -1;

// initialise Arrays: POINTS, ANSWERS, 
for (let i = 0; i < totalQuestions; i++)
{
    q_id = `q${i}`;
    q_data = QUESTIONS[q_id];
    POINTS['m0'][q_id] = {};
    POINTS['m1'][q_id] = {};

    if (q_data['type'] === 'singleSelect') { 
        ANSWERS[q_id] = null; }
    else {
        try { // if multi select make an array of specified length in questions data
            let max_options = Number(q_data['options']?.['max'])
            ANSWERS[q_id] = Number.isInteger(max_options) ? Array() : null //TERNARY OPERATOR LOL :)
        }
          catch(err) {console.log(err)}
        }
}

const q_type_functions = 
{
    // 'multiSelect' : saveAnswer_multiSelect(),
    // 'singleSelect' : saveAnswer_singleSelect()
}

// Renders each question to the html file, based on the type of the question and its options.
function renderQuestion(q_id, operation='insert')
{
    // Render the Question Div
    let question = document.createElement('div');
    question.classList.add('mb-4', 'question', 'display-hide', 'position-relative', 'w-100')
    question.id = q_id
    let q_object = QUESTIONS[q_id]
    let q_no = Number(q_id.charAt(1)); // Convert to int
    let q_text = q_object['text'];

    // Render Question text
    let text_html = `<h5 class='animated-text'>${q_no}. ${q_text}</h5>`
    question.innerHTML = text_html;

    // Generate (More info) button:
    // UNFINISHED -----------------
    // Add extra info section to answers
    /*
     let info_text = q_object?.['more-info']?.['text']
    let info_desc = q_object?.['more-info']?.['description'] 
    question.insertAdjacentHTML('beforeend',`<button type="button" class="btn btn-outline-secondary position-absolute bottom-50 end-0" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="${info_desc}">${info_text}</button>`)
    */

    // Render Question Answer Keys
    answers_html = GenerateAnswersHTML(q_id);
    let type = typeof answers_html;
    question.insertAdjacentHTML('beforeend', `<div class='animated-text'>${answers_html}</div`);

    // If first time then insert, if updating (like q2 then update present question accordingly)
    if (operation == 'insert') {
         document.getElementById('questions').appendChild(question)}
    // else if (operation == 'update'){
    //     document.getElementById('q_id') = question
}

// Returns options_html for a given question id (assumes already rendered questions div).
function GenerateAnswersHTML(q_id)
{
    let q_object = QUESTIONS[q_id]
    let q_keys = q_object['options']['keys']
    let q_no = q_id.charAt(1)
    let keys_html = '';

    // Function based on question type and answers type
    switch(q_object['type'])
    {
        case 'singleSelect':
            for (let k in q_keys)
            {
                key = q_keys[k]
                // Render Elements of answer
                let inputElement = `<input type='radio' class='btn-check q-option' name='options-base${q_no}' id='${q_id}-${k}' value='${key['value']}' data-related-movie=''>`
                let labelElement = `<label class='m-2 btn btn-outline-light' id='${q_id}-${k}-label' for='${q_id}-${k}'>${key['text']}</label>`
                let key_html = inputElement + labelElement;
                keys_html += key_html;
            }
            break;
        
        case 'multiSelect': 
            // different rendering for images and text boxes
            if (q_object['options']['type'] === 'text'){
                for (let k in q_keys)
                {
                    key = q_keys[k]
                    // Render Elements of answer
                    let inputElement = `<input type="checkbox" class="btn-check q-option" id="${q_id}-${k}" autocomplete="off">`
                    let labelElement = `<label class='m-2 btn btn-outline-light' for='${q_id}-${k}'>${key['text']}</label>`
                    let key_html = inputElement + labelElement;
                    keys_html += key_html;
                }
                break;
            }

            else if (q_object['options']['type'] === 'image')
            {
                let container = document.createElement('div');
                container.classList.add('container')
                let row = document.createElement('div')
                row.classList.add('row');
                for (let k in q_keys){
                    let key = q_keys[k];
                    let m_div = document.createElement('div');
                    m_div.classList.add('col-md-4') ;
                    let m_anchor = document.createElement('a');
                    m_anchor.classList.add('movie-poster')
                    m_anchor.setAttribute('href', '#');
                    let img = document.createElement('img')
                    img.src = 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'
                    img.alt = 'noImage'
                    let title = document.createElement('div')
                    title.classList.add('movie-title')
                    title.innerHTML='MOVIE TITLE'

                    m_anchor.appendChild(img)
                    m_anchor.appendChild(title)
                    m_div.appendChild(m_anchor)
                    row.appendChild(m_div)
                }
                container.appendChild(row)
                return;
            }
        
        default:
            keys_html = `PENDING DEVELOPMENT: /n Question ID: ${q_id} /n of type ${q_object['type']} /n Answers of type: ${q_object['options']['type']}`
    }
    return keys_html
}

// Move between questions in the quiz, Start quiz, and finish quiz. (Currently moves between questions 0, 1, 2 only. Later on will add more questions)
function changeQuestion(direction)
{
    console.log(`Before function: current_q: q${current_q}`);
    switch(direction)
    {
      case 'next': ///////////////////////V1.0 changes, for later on will have current_q < totalQuestions - 1
        if (current_q >= 0 && current_q < 2) // Using total_q-1 because current_q starts from 0.
        {
            // Hide current question, show next question
            document.getElementById(`q${current_q}`).style.display = 'none';
            document.getElementById(`q${++current_q}`).style.display = 'inline-block';
            
            // save answers for previous question
            // saveAnswer(`q${current_q-1}`);
        }

        // if reached last Question
        // if (current_q == totalQuestions - 1)
        if (current_q == 2)
        {  
            document.getElementById('nextQuestionButton').style.visibility = 'hidden';
            document.getElementById('finishQuizButton').style.display = 'inline-block';

            // did not write html yet
            // on its click start calculating scores and points. (server side if you want to keep the system hidden)
        }
        // Always show previous button on changing to next.
        document.getElementById('previousQuestionButton').style.visibility = 'visible'
        break;

      case 'previous':
        // If changing within range
        if (current_q > 0 && current_q <= totalQuestions - 1) // Using total_q-1 because current_q starts from 0.
        {
            // Hide current question, show previous question
            document.getElementById(`q${current_q}`).style.display = 'none';
            document.getElementById(`q${--current_q}`).style.display = 'inline-block';
            
            // save answers for previous question
            // saveAnswer(`q${current_q+1}`)
        }

        if (current_q == 0){
            // hide previous question button
            document.getElementById('previousQuestionButton').style.visibility = 'hidden';
        }

        // Always show Next question button on changing to previous.
        document.getElementById('nextQuestionButton').style.visibility = 'visible'
        break;

      case 'start':
        // Remove button, show first question, and next question button
        document.getElementById('startQuizButton').remove();
        document.getElementById('quiz-container').style.display = 'inline-block';
        document.getElementById('questions').style.display = 'inline-block';
        document.getElementById('nextQuestionButton').style.visibility = 'visible';
        document.getElementById(`q${++current_q}`).style.display = 'inline-block';
        break;
    // Idk if this will ever trigger :)
    default:
        console.log('DO NOT MESS WITH MY WEBPAGE PLEASE. I can barely write code, so might have put a Remove("C/System32") somewhere')
    }
}

// Record an option pressed to ANSWERS. Also unrecord old and unwanted answers.
function saveAnswer(button)
{
let q_id = (button.id).slice(0,2)
let q_data = QUESTIONS[q_id]
let q_type = q_data['type']
let o_id = (button.id).slice(3,5)
let o_data = q_data['options']['keys'][o_id]

// Record answer based on question type
switch (q_type) {
    case 'singleSelect': 
        ANSWERS[q_id] = o_data;
        break;
    

    case 'multiSelect': 
        // max number of choices. if not availale set to options length
        let max_options = Number.isInteger(Number(q_data['options']['max'])) ? Number(q_data['options']['max']) : q_data['options']['keys'].length;

        // Assign to empty spot in answers object
        q_answers = ANSWERS[q_id] // this is an array of length(max_options), starts as empty

        // Check if answer recorded before
        for (let i = 0; i < q_answers.length; i++) {
            // Modify (uncheck from html and shift fron array)
            if  (q_answers[i] === o_data){
                button.checked = false;
                ANSWERS[q_id].splice(i, 1);
                return;
            }
        }

        // New answer and available space
        if (q_answers.length < max_options) {
            ANSWERS[q_id].push(o_data)
            return;
        }

        // New answer, But no space. Shift and uncheck old, push new
        else {
            let ans_toshift_id = ANSWERS[q_id][0]['id'];
            let button_touncheck_id = `${q_id}-${ans_toshift_id}`
            document.getElementById(button_touncheck_id).checked = false;
            ANSWERS[q_id].shift()
            ANSWERS[q_id].push(o_data)
            return;
        }
    

    default: {
        console.log('DO NOT MESS WITH MY WEBPAGE PLEASE. I can barely write code, so might have put a Remove("C/System32") somewhere');
    }


    }
}

function finishQuiz(event) {
    
    // Create a hidden input field to add choices
    var winner = document.createElement('input');

    winner.type = 'hidden';
    winner.name = 'winner';
    
    // Currently sends the whole choice data (later on will refine to save data)

    /////////////////////////////////// PENDING :write function that returns winner movie after calculating points for each movies from Answers. (includes its data)
    // winner.value = findWinner();
    winner.value = sessionStorage.getItem('choice_0');
    ///////////////////////////////////

    // Check if function calls succeeded
    if (!(winner.value))
    {
        console.error('CHOOSE BOTH MOVIES PLEASE');
        return false;
    }

    // Remove existing hidden inputs with the same names
    event.target.querySelectorAll('input[name="winner"]').forEach(el => el.remove());

    // Append the new hidden input field to the form
    event.target.appendChild(winner);

    // Continue with the form submission
    return true; // Returning true allows the form submission to proceed
}

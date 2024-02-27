// Dict to hold inputed answers for each question. including true or false questions (conditionals), multiple choice questions and mnore. 
// Conditional questions will have a one value. eg if ANSWERS['q0']['type']='conditional' THEN ANSWERS['q0']['value'] = 'true' OR 'false'
// Multi select questions will have multiple values for each selected option. for example.
// if ANSWERS['q1']['type']='multiSelect' THEN :  ((for example question about similarmovies))


// Dict to hold inputed answers for each question. including true or false questions (conditionals), multiple choice questions and more. 
// Conditional questions will have a one value. eg if ANSWERS['q0']['type']='conditional' THEN ANSWERS['q0']['value'] = 'true' OR 'false'
// Multi select questions will have multiple values for each selected option. for example.
// if ANSWERS['q1']['type']='multiSelect' THEN :  ((for example question about similarmovies))
/* ANSWERS['q1']['value']= {
 v0: {
    'related_movie' : 'm0' or 'm1'   (((not sure yet if this will be needed in the points calculating stage or not)))
    'value' : '1' or 2 or 3 idk
  } 
 v1: {...} 
 }


 <!-- <div class='mb-4 question' id="q0">
    <h5>0. Does the movie have to be family friendly?</h5>
    <input type="radio" class="btn-check q-option" name="options-base0" id="q0-option0" value="true" data-q-type="conditional" data-related-movie="">
    <label class="m-2 btn btn-outline-light" for="q0-option0">Yes</label>
    <input type="radio" class="btn-check q-option" name="options-base0" id="q0-option1" value="false"data-related-movie="">
    <label class="m-2 btn btn-outline-light" for="q0-option1">No</label>
</div> -->


can Use optional chaining and the ternary operator for safely indexing into and returning a default value like this
const obj = { nested: { prop: 'value' } };

// Using optional chaining with the ternary operator
const result = obj?.nested?.prop !== undefined ? obj.nested.prop : 'default value';

console.log(result); // Output: 'value'

 */
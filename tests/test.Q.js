const ANSWERS = {}
// Dict to hold inputed answers for each question. including true or false questions (conditionals), multiple choice questions and mnore. 
// Conditional questions will have a one value. eg if ANSWERS['q0']['type']='conditional' THEN ANSWERS['q0']['value'] = 'true' OR 'false'
// Multi select questions will have multiple values for each selected option. for example.
// if ANSWERS['q1']['type']='multiSelect' THEN :  ((for example question about similarmovies))
ANSWERS['q1']['value'] = 
{
    'v0': 
    {
        'related_movie' : 'm0', // or 'm1' (((not sure yet if this will be needed in the points calculating stage or not)))
        'value' : '1' //or 2 or 3 idk
    },
    'v1': '...'
 }

// also might record questions types separately on a object and call it questions. this might be useful for automating the proccess of showing the template and rendering it automatically instead of statically.
//for example     
 const QUESTIONS = {}
 QUESTIONS['q0']= {
    'type':'multiSelect', 
    'text': 'lorem ibsum',
    'options': 
    {
        'o0': {
            'text':'lorem ibsum...',
            'value': '1'
        },
        'o1': '...'
    }
 }
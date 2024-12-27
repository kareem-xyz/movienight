from flask import Flask, render_template, request, redirect, url_for, session
from flask_session import Session
from concurrent.futures import ThreadPoolExecutor
from datetime import timedelta
from helpers import * # import all helper function from helper.py
import json
from itsdangerous import URLSafeTimedSerializer

# Configure Application
app = Flask(__name__)
executor = ThreadPoolExecutor()

# Set the secret key for session
app.secret_key = '_5#y2LF4Qsbfiqbf2768er4vef6acg7egt7b9rgv634vbt7fgve'
app.config['SESSION_TYPE'] = 'filesystem' # use filesystem storage (server storage)
app.config['SESSION_PERMANENT'] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True # Ensure templates are auto-reloaded
Session(app) 


@app.route('/test')
def test():
    with open('static/assets/questions.json', 'r') as f:
        questions_json = json.load(f)
    return render_template('test.html', questions=questions_json['questions'])

# Load index
@app.route('/')
def index():
    session.clear()
    return render_template('layout.html')
    
@app.route('/search')
def search():
    # Using GET (also from forms) if I used POST I would have used request.form.get
    input_0 = request.args.get("movie0")
    input_1 = request.args.get("movie1")
    
    # Check for invalid input
    if not (input_0 and input_1):
        return redirect('/')
    
    # Movie Databases Api to get Movie's Data.
    # https://rapidapi.com/SAdrian/api/moviesdatabase/

    # Api Specifics (login key and query parameters)
    querystring = {"exact":"false","titleType":"movie", "info":"custom_info"}

    # Run Api
    data_0 = get_movie_info(title=input_0, params=querystring)
    data_1 = get_movie_info(title=input_1, params=querystring)

    # Format Movies for sending (jsonifying and sorting)
    if data_0:
        data_0 = sorted(data_0, key=lambda x : (x['primaryImage'] is not None, x['ratingsSummary']['voteCount']), reverse=True)
        data_0 = replace_quotes(data_0)

    if data_1:
        data_1 = sorted(data_1, key=lambda x : (x['primaryImage'] is not None, x['ratingsSummary']['voteCount']), reverse=True)
        data_1 = replace_quotes(data_1)
            
    return render_template('search.html', datalist_0=data_0, datalist_1=data_1)

@app.route("/fight", methods=['POST'])
def fight():
    # Get list of IDs for director, creators, writers, and cast of each movie
    cast_0 = request.form.get('cast_0')
    cast_1 = request.form.get('cast_1')

    # Check for invalid input
    if not (cast_0 and cast_1):
        return render_template('bug.html', bug='Did not receive cast list for both movies. ERROR 100')
    try :
        # Since values are a single line of csv strings. We can just split.
        cast_0 = cast_0.split(',')
        cast_1 = cast_1.split(',')
    except Exception as e:
        return render_template('bug.html', bug=f'Some error with data: {str(e)}')

    # Run API to Get ACTORS data Use asyncio to run the asynchronous function for both lists concurrently
    try:
        list_0, list_1 = run_async(get_all_actors_info(cast_0)), run_async(get_all_actors_info(cast_1))
    except Exception as e:
        return render_template('bug.html', bug=f'Error fetching actor info: {str(e)}')
    
    # UNNECSSARY AFTER MADE FUNCTION FOR BELOW, Faced some trouble so might fall back
    # Run API to Get Movies of Actors
    # movies_IDs_1 = []
    # for index, actor in enumerate(list_0):
    #     try:
    #         movies_IDs_0 += (actor['results']['knownForTitles']).split(',')
    #     except Exception as e:
    #         print(f'Error at index {index}')
    #         print(e)
    #         continue
    movies_IDs_0 = get_actors_movies(list_0)
    movies_IDs_1 = get_actors_movies(list_1)

    # Remove duplicates from  each list (works by converting to dict and back to list)
    movies_IDs_0 = list(dict.fromkeys(movies_IDs_0))
    movies_IDs_1 = list(dict.fromkeys(movies_IDs_1))

    # Remove overlapping movies from lists (I dont want to ask about a movie if it will add points to both movies)
    movies_IDs_0 = remove_overlap(movies_IDs_0, movies_IDs_1)
    movies_IDs_1 = remove_overlap(movies_IDs_1, movies_IDs_0)

    # Run API for  Movies Data
    data_0 = get_all_movies_info(IDs_list=movies_IDs_0)
    data_1 = get_all_movies_info(IDs_list=movies_IDs_1)
    
    # Format JSON correctly.
    data_0 = replace_quotes(data_0) 
    data_1 = replace_quotes(data_1) 

    # session used to access data across different flask routes without using URL parameters (big files dont work well with URLs)
    session['m0_similarMovies'] = data_0 
    session['m1_similarMovies'] = data_1
        
    # return render_template('fight.html', questions=questions_json['questions'], m0_similarMovies=data_0, m1_similarMovies=data_1)
    # Now rendering via a different route to simplify GET requests and refreshes.
    return redirect(url_for('result'))

@app.route('/result', methods=['GET'])
def result():
    # Pass the questions file too.
    with open('static/assets/questions.json', 'r') as f:
        questions_json = json.load(f)
    q =  questions_json['questions']
    s0 = session.get('m0_similarMovies')
    s1 = session.get('m1_similarMovies')

    # if session data cleared go to homepage
    if (not s0 or not s1):
        if not (s0 and s1):
            return redirect('index')
        return render_template('bug.html', bug='Did not find list of similar movies for one of the movies, OR movie data is cleared')
    
    return render_template('fight.html', questions=q, m0_similarMovies=s0, m1_similarMovies=s1)

@app.route('/winner', methods=['POST'])
def winner():
    winner = request.form.get('winner')
    if winner:
        winner = json.loads(winner)
    else:
        return render_template('bug.html', bug='Did not receive winner movie')
    return render_template('winner.html', winner=winner)
    
if __name__ == "__main__":
    app.run(debug=True)

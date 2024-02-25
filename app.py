

from flask import Flask, render_template, request, redirect
from concurrent.futures import ThreadPoolExecutor
from helpers import * # import all helper function from helper.py
import json

# Configure Application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

executor = ThreadPoolExecutor()

@app.route('/test')
def test():
    with open('static/tests/questions.json', 'r') as f:
        questions_json = json.load(f)
    return render_template('test.html', questions=questions_json['questions'])
# Load index
@app.route('/')
def index():
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
        for i in range(len(data_0)) :
            try:
                data_0[i]['plot']['plotText']['plainText'] = data_0[i]['plot']['plotText']['plainText'].replace('"', "'")
            except TypeError:
                continue

    if data_1:
        data_1 = sorted(data_1, key=lambda x : (x['primaryImage'] is not None, x['ratingsSummary']['voteCount']), reverse=True)
        for i in range(len(data_1)) :
            try:
                data_1[i]['plot']['plotText']['plainText'] = data_1[i]['plot']['plotText']['plainText'].replace('"', "'")
            except TypeError:
                continue
            
    return render_template('search.html', datalist_0=data_0, datalist_1=data_1)

@app.route("/fight", methods=['POST', 'GET'])
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
    
    # Run API to Get Movies of Actors
    movies_IDs_0 = []
    movies_IDs_1 = []
    for index, actor in enumerate(list_0):
        try:
            movies_IDs_0 += (actor['results']['knownForTitles']).split(',')
        except Exception as e:
            print(f'Error at index {index}')
            print(e)
            continue
    for index, actor in enumerate(list_1):
        try:
            movies_IDs_1 += (actor['results']['knownForTitles']).split(',')
        except Exception as e:
            print(f'Error at index {index}')
            print(e)
            continue

    # Remove duplicates from list (works by converting to dict and back to list)
    movies_IDs_0 = list(dict.fromkeys(movies_IDs_0))
    movies_IDs_1 = list(dict.fromkeys(movies_IDs_1))

    data_0 = get_all_movies_info(IDs_list=movies_IDs_0)
    data_1 = get_all_movies_info(IDs_list=movies_IDs_1)

    # Pass the questions file too.
    with open('static/tests/questions.json', 'r') as f:
        questions_json = json.load(f)
        
    return render_template('questions.html', questions=questions_json, similarMovies0=data_0, similarMovies1=data_1)


from ast import Constant
from os import error
from flask import Flask, render_template, request, redirect 
import requests # Used in the query Api
import httpx
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Configure Application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True
# Used in each Api request.
headers = {
        "X-RapidAPI-Key": "dcabfff8b1msh47092185488eb22p1b47e2jsn45e1e47ab1f7",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }
executor = ThreadPoolExecutor()

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
    data_0 = get_movie_data(title=input_0, params=querystring)
    data_1 = get_movie_data(title=input_1, params=querystring)

    # Format Movies for sending (jsonifying and sorting)
    if data_0:
        data_0 = sorted(data_0, key=lambda x : (x['primaryImage'] is not None, x['ratingsSummary']['voteCount']), reverse=True)
        for i in range(len(data_0)) :
            try:
                data_0[i]['plot']['plotText']['plainText'] = data_0[i]['plot']['plotText']['plainText'].replace('"', "'")
            except TypeError as t:
                print(i)
                print(t)
                continue

    if data_1:
        data_1 = sorted(data_1, key=lambda x : (x['primaryImage'] is not None, x['ratingsSummary']['voteCount']), reverse=True)
        for i in range(len(data_1)) :
            try:
                data_1[i]['plot']['plotText']['plainText'] = data_1[i]['plot']['plotText']['plainText'].replace('"', "'")
            except TypeError as t:
                print(i)
                print(t)
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

    # Run API. Use asyncio to run the asynchronous function for both lists concurrently
    try:
        list_0, list_1 = run_async(get_all_actors_info(cast_0)), run_async(get_all_actors_info(cast_1))
    except Exception as e:
        return render_template('bug.html', bug=f'Error fetching actor info: {str(e)}')

    return render_template('questions.html', similarMovies0=list_0, similarMovies1=list_1)

    
# get Data for one movie. Takes movie title and parameters as input.
def get_movie_data(title, params):
    base_url='https://moviesdatabase.p.rapidapi.com/titles/search/title/'
    response = requests.get(base_url + title, headers=headers, params=params)
    # Convert to json and return only the results
    return response.json()['results']
    
# Data for list of actors. Asyncio. Takes list of cast IDs.
async def get_all_actors_info(cast_list):
    coroutines = [get_actor_info(actor_id) for actor_id in cast_list]
    return await asyncio.gather(*coroutines)
    
# Data for One actor. Asyncio Takes a single actor ID.
async def get_actor_info(actor_id):
    base_url = 'https://moviesdatabase.p.rapidapi.com/actors/'
    async with httpx.AsyncClient() as client:
        response = await client.get(base_url + actor_id, headers=headers)
        return response.json()

def run_async(func):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(func)
    loop.close()
    return result


# DEPRECATED FOR NOW
"""
@app.route('/compare', methods=['POST'])
def compare():
    choices = []
    choices.append(request.form.get('id_0'))
    choices.append(request.form.get('id_1'))

    # Api requests
    url = "https://moviesdatabase.p.rapidapi.com/titles/" # + /movie_id

    # returns all information on the title
    querystring = {"info":"custom_info"}

    headers = {
        "X-RapidAPI-Key": "dcabfff8b1msh47092185488eb22p1b47e2jsn45e1e47ab1f7",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }
    #  Request data
    response_0 = requests.get(url + choices[0], headers=headers, params=querystring)
    response_1 = requests.get(url + choices[1], headers=headers, params=querystring)

    # Convert to json for exchanging data
    json_0 = response_0.json()
    json_1 = response_1.json()

    return render_template('compare.html', m0=json_0["results"], m1=json_1["results"])
"""


from os import error
from flask import Flask, render_template, request, redirect 
import json
import requests # Used in the query Api
from operator import itemgetter # used for sorting of responses from api

# Configure Application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

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

    # Format Api Urls for each movie inputed
    url_0 = "https://moviesdatabase.p.rapidapi.com/titles/search/title/" + input_0
    url_1 = "https://moviesdatabase.p.rapidapi.com/titles/search/title/" + input_1

    # Api Specifics (login key and query parameters)
    querystring = {"exact":"false","titleType":"movie", "info":"custom_info"}
    headers = {
        "X-RapidAPI-Key": "dcabfff8b1msh47092185488eb22p1b47e2jsn45e1e47ab1f7",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }

    # Run Api
    response_0 = requests.get(url_0, headers=headers, params=querystring)
    response_1 = requests.get(url_1, headers=headers, params=querystring)

    # Convert response to json format to exchange with JS
    json_0 = response_0.json()
    json_1 = response_1.json()

    # Take the useful data only
    data_0 = json_0['results']
    data_1 = json_1['results']

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

@app.route("/fight", methods=['POST', 'GET'])
def fight():
    return render_template('questions.html')
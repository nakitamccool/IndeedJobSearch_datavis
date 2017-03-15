# from flask import Flask
# from flask import render_template
# from pymongo import MongoClient
# import json
# import os
#
# app = Flask(__name__)
#
# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
#
# # MONGODB_URI = os.getenv('MONGODB_URI')
# DBS_NAME = 'IndeedJobSearch'
# COLLECTION_NAME = 'IJS'
# FIELDS = {'date': True,
#           'company': True,
#           'city': True,
#           'formattedRelativeTime': True,
#           'jobtitle': True,
#           'jobkey': True,
#           'Industry': True,
#           '_id': False}
#
#
# @app.route("/")
# def index():
#     return render_template("index.html")
#
#
# @app.route("/IndeedJobSearch/IJS")
# def donor_projects():
#     connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
#     # connection = MongoClient(MONGODB_URI)
#     collection = connection[DBS_NAME][COLLECTION_NAME]
#     projects = collection.find(projection=FIELDS, limit=55000)
#     json_projects = []
#     for project in projects:
#         json_projects.append(project)
#     json_projects = json.dumps(json_projects)
#     connection.close()
#     return json_projects
# #   important to close the connection
#
#
# if __name__ == "__main__":
#     app.run(debug=True)

    # import json
    # from flask import Flask
    # from indeed import IndeedClient
    # app = Flask(__name__)
    #
    # client = IndeedClient('6568994880074204')
    #
    # @app.route('/')
    #
    #
    # def runSearch():
    #     try:
    #          for n in range(0,100,25):
    #                 params = {
    #                     'q': 'developer',
    #                     'channel': 'ie',
    #                     'co': 'ie',
    #                     'start': n,
    #                     'limit' : 25,
    #                     'userip': "51.171.7.156",
    #                     'useragent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2)"
    #                 }
    #                 search_response = client.search(**params)
    #                 print search_response
    #     except:
    #         pass
    #
    #
    # if __name__ == '__main__':
    #     app.run(debug=True)





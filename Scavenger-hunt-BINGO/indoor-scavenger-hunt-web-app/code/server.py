from flask import Flask, request, jsonify
import os


# <start> Pieces from notebook prototyping..
#

from watson_developer_cloud import VisualRecognitionV3
import json
import re
from PIL import Image

model_id = "" # <-- PASTE YOUR MODEL ID HERE
apikey   = "" # <-- PASTE YOUR APIKEY HERE

visual_recognition = VisualRecognitionV3( version="2018-03-19", iam_apikey=apikey )

def getKey( item ):
    return item[ "score" ]

def getTopClass( results ):
    results_classes = results[ "images" ][ 0 ][ "classifiers" ][ 0 ][ "classes" ]
    sorted_results_classes = sorted( results_classes, key=getKey, reverse=True )
    return sorted_results_classes[0]

def classifyImage( image_filename ):
    with open( image_filename, "rb" ) as image_file:
        results = visual_recognition.classify( image_file, threshold="0", classifier_ids=model_id ).get_result()
        print( "Results:" )
        print( json.dumps( results, indent=3 ) )
        top_class = getTopClass( results )
        return { "top_class" : top_class, "results" : results }

def resizeImage( org_filename ):
    img = Image.open( org_filename )
    img.thumbnail( ( 224, 224 ), Image.ANTIALIAS )
    file_base_name = re.sub( "\..*$", "", org_filename )
    file_extension = re.sub( ".*\.", "", org_filename )
    sm_filename = file_base_name + "_sm." + file_extension
    print( "Full name: " + sm_filename )
    img.save( sm_filename )
    return sm_filename

# <end> Pieces from notebook prototyping..
#

def saveOrgFile( file ):
    print( "Saving: " + file.filename )
    filename = os.path.join( app.config[ "UPLOAD_DIR" ], file.filename )
    print( "Full name: " + filename )
    file.save( filename )
    return filename

app = Flask( __name__, static_url_path="" )
app.config[ "MAX_CONTENT_LENGTH" ] = 16 * 1024 * 1024
app.config[ "BASE_DIR" ] = os.path.dirname( os.path.realpath( __file__ ) )
app.config[ "UPLOAD_DIR" ] = os.path.join( app.config[ "BASE_DIR" ], "uploads" )
if not os.path.exists( app.config[ "UPLOAD_DIR" ] ):
    os.mkdir( app.config[ "UPLOAD_DIR" ] )

# On IBM Cloud Cloud Foundry, get the port number from the environment variable PORT
# When running this app on the local machine, default the port to 8000
port = int( os.getenv( "PORT", 8000 ) )

@app.route( "/" )
def root():
    return app.send_static_file( "index.html" )

@app.route( "/uploadimagefile", methods=[ "POST" ] )
def uploadimagefile():
    file_list = request.files.getlist( "image_file" )
    if len( file_list ) < 1 :
        print( "my_debug: file_list empty" )
        return jsonify( { "error" : "No file selected" } )
    else:
        file = file_list[0]
        org_filename = saveOrgFile( file )
        sm_filename = resizeImage( org_filename )
        results = classifyImage( sm_filename )
        os.remove( org_filename )
        os.remove( sm_filename )
        return jsonify( results )
        
if __name__ == "__main__":
    app.run( host="0.0.0.0", port=port, debug=True)

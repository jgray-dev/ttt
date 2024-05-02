from flask import Flask
from flask_cors import CORS
import os
from database import *
from flask_migrate import Migrate
from utilities import *


@app.route('/api/hello')
def hello():
    return {'message': 'Hello from Flask!'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)

# test for merge from jackson branch

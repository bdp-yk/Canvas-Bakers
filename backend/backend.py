""" index file for REST APIs using Flask """
import os
import sys
import requests
from flask import jsonify, request, make_response, send_from_directory

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

PUBLIC_PATH = os.path.join(ROOT_PATH, 'public')

import modules.logger as logger  # noqa
from modules.app import app  # noqa

# Create a logger object to log the info and debug
LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))

# Port variable to run the server on.
PORT = os.environ.get('PORT',5000)

@app.route('/api/v1.0/ping', methods=['GET'])
def dummy_endpoint():
    """ Testing endpoint """
    return jsonify({'data': 'Server running'}), 200
from modules.app.controllers import *   # pylint: disable=W0401,C0413


if __name__ == '__main__':
    LOG.info('running environment: %s', os.environ.get('ENV',"development"))
    app.config['DEBUG'] = "development"
    # app.run(host='0.0.0.0', port=int(PORT))
    app.run(host='127.0.0.1', port=int(PORT))

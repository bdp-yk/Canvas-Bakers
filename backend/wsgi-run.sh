#!/bin/bash
# uwsgi --ini backend.ini
uwsgi --socket 0.0.0.0:5000 --protocol=http -w wsgi:app
# uwsgi --socket 0.0.0.0:5000 -w wsgi:app
# uwsgi --http-socket :8787 --home /vol1/MySites/PyTune3/venv --chdir /vol1/MySites/PyTune3 -w wsgi

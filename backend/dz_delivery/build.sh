#!/usr/bin/env bash
# exit on error
set -o errexit

# Python virtual environment setup
python -m venv venv
. venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate
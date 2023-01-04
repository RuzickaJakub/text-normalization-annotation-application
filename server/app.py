"""The file contains function for the app initialization."""

from flask import Flask
from flask_cors import CORS

cors = CORS()


def create_app():
    """Initialize the Flask app."""
    app = Flask(__name__)
    cors.init_app(app)

    return app

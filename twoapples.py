from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app import application

from app import routes, models
if __name__ == "__main__":
   application.run(debug=False)
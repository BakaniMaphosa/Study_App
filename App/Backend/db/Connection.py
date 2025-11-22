from sqlalchemy import create_engine

DB_PATH = "/Users/bakani/Desktop/Study_App/App/Backend/db/Notes.db"
engine = create_engine(f"sqlite:///{DB_PATH}",echo=True)

def connection():
   return engine.connect()
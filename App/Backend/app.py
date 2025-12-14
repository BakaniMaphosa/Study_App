import os
from flask import Flask
from models import db
from routes.notes import notes_bp

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, "instance")

def create_app():
    # Explicitly tell Flask where the instance folder is
    app = Flask(
        __name__,
        instance_path=INSTANCE_DIR,
        instance_relative_config=True
    )

    # Ensure the instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)

    # Explicit database location
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "sqlite:///" + os.path.join(app.instance_path, "app.db")
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(notes_bp, url_prefix="/api/notes")


    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)

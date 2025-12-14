from flask import Blueprint, request, jsonify
from models import db, StudyNote
from datetime import datetime

notes_bp = Blueprint("notes", __name__)

@notes_bp.route("/", methods=["GET"])
def get_notes():
    notes = StudyNote.query.all()
    print("NOTES FOUND:", len(notes))
    return jsonify([
        {
            "NoteID": n.NoteID,  
            "Title": n.Title,
            "Description": n.Description,
            "Difficulty": n.Difficulty,
            "NoteTags": n.NoteTags,
            "Pinned": n.pinned,
            "WordCount": n.word_count,
            "AvgReadTime": n.avg_Readtime,
            "Version": n.Version,
            "NoteStyle": n.note_Style,
            "RecentUpdate": n.RecentUpdate.isoformat() if n.RecentUpdate else None
        }
        for n in notes
    ])


@notes_bp.route("/", methods=["POST"])  #get json data from the frontend javascript
def create_note():
    data = request.json

    note = StudyNote(
        Title=data["Title"],
        Description=data.get("Description"),
        Difficulty=data.get("Difficulty"),
        NoteTags=data["NoteTags"],
        NoteContent=data.get("NoteContent"),
        Images=data.get("Images"),
        Graphs=data.get("Graphs"),
        note_Style=data.get("note_Style"),
        Version=data.get("Version"),
        pinned=data.get("pinned", False),
        word_count=data.get("word_count", 0),
        avg_Readtime=data.get("avg_Readtime", 0.0),
        backup_Count=data.get("backup_Count", 0),
        ai_Summery=data.get("ai_Summery"),
        NoteStreak=data.get("NoteStreak", 0),
        RecentUpdate=datetime.utcnow()
    )

    db.session.add(note)
    db.session.commit()

    return jsonify({
        "success": True,
        "NoteID": note.NoteID
    }), 201


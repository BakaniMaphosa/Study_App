from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class StudyNote(db.Model):
   __tablename__ = "StudyNotes"
   
   NoteID = db.Column('NoteID', db.Integer, primary_key=True,autoincrement=True)
   Title = db.Column('Title', db.String(40),nullable=False)
   RecentUpdate = db.Column('RecentUpdate', db.DateTime, nullable=False)
   NoteStreak = db.Column('NoteStreak',db.Integer)
   Description = db.Column('Description',db.String(110))
   Difficulty = db.Column('MemorisationDifficulty',db.Float)
   NoteTags = db.Column('NoteTags',db.String(110),nullable = False)

   pinned = db.Column("pinned", db.Boolean, default=False)
   word_count = db.Column("word_count", db.Integer, default=0)
   avg_Readtime = db.Column("avg_ReadTime", db.Float, default=0.0)
   ai_Summery = db.Column("ai_Summery", db.Text)       # long text allowed
   backup_Count = db.Column("backup_Count", db.Integer, default=0)
   Version = db.Column("Version",db.Float)
   note_Style = db.Column("note_Style", db.String(200))
   
   NoteContent = db.Column('NoteContent',db.Text)
   Images = db.Column('Images',db.String(200)) #stores the path of the image in the database, and the actuall image in the project folder
   Graphs = db.Column('Graphs',db.Text) #stores json form of dictionary data
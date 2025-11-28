from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String,Float, DateTime, Boolean, Text, ForeignKey


DB_PATH = "/Users/bakani/Desktop/Study_App/App/Backend/db/Notes.db"

engine = create_engine(f"sqlite:///{DB_PATH}",echo=True)
meta = MetaData()

user_NotesData = Table(
   "Meta_StudyNotes",
   meta,
   Column('NoteID', Integer, primary_key=True,autoincrement=True),
   Column('Title', String,nullable=False),
   Column('RecentUpdate', DateTime, nullable=False),
   Column('NoteStreak',Integer),
   Column('Description',String),
   Column('MemorisationDifficulty',Float),
   Column('NoteTags',String,nullable = False),

   Column("pinned", Boolean, default=False),
   Column("word_count", Integer, default=0),
   Column("avg_ReadTime", Float, default=0.0),
   Column("ai_Summery", Text),       # long text allowed
   Column("backup_Count", Integer, default=0),
   Column("Version",Float),
   Column("note_Style", String)
)

user_NotesMetaData = Table(
 "Data_StudyNotes",  #all heavy data will be stored here, large bytes of text, paths, etc
 meta,
 Column('NoteID',Integer,ForeignKey('Meta_StudyNotes.NoteID'),primary_key=True),
 Column('NoteContent',Text),
 Column('Images',String), #stores the path of the image in the database, and the actuall image in the project folder
 Column('Graphs',String) #stores json form of dictionary data
)

meta.create_all(engine)
from Backend.db.Connection import connection 
from sqlalchemy import MetaData, Table, text
import datetime
import json
#create basic/standard notes
class noteTemplate:
    def __init__(self, title, streak, description, difficulty, tags, style     
                   ):
        self.title = title
        self.note_Streak = streak
        self.timestamp = datetime.datetime.now()
        self.Note_style = json.dumps(style)
       
        self.description = description
        self.memorisation_Difficulty = difficulty
        if len(tags) == 0:
            self.note_Tags = json.dumps(["Notes","Revision"])
        else:
            self.note_Tags = json.dumps(tags)
        
        #noteID = generateID()
    
    def generateNote(self):
       conn = connection()
       meta = MetaData()
       # Reflect tables
       MetaTable = Table("Meta_StudyNotes", meta, autoload_with=conn)
       DataTable = Table("Data_StudyNotes",meta,autoload_with=conn)
       
       insert_MetaData = MetaTable.insert().values(
         Title= self.title,
         RecentUpdate= self.timestamp,
         NoteStreak= self.note_Streak,
         Description=self.description,
         MemorisationDifficulty=self.memorisation_Difficulty,
         NoteTags=json.dumps(self.note_Tags),
         pinned=False,
         word_count=0,
         avg_ReadTime=0.0,
         ai_Summery="None",
         backup_Count=0,
         Version=1.0,
         note_Style=json.dumps(self.Note_style)
       )
       
       insert_Data = DataTable.insert().values(
         NoteContent = "Whenever you're ready...",
         Images = None,
         Graphs = None,
         
       )
       
      
       conn.execute(insert_MetaData)
       conn.execute(insert_Data)
       note_id = conn.execute(text("SELECT last_insert_rowid()")).fetchone()[0] #id is common to the data and metadata (foreign key)
       conn.commit()
       conn.close()
       return note_id

        

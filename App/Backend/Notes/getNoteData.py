from Backend.db.Connection import connection
from sqlalchemy import Table,MetaData
class getNoteData:
    
    def __init__(self,NoteID):
        conn = connection()
        meta = MetaData()
        MetaTable = Table("Meta_StudyNotes",meta,autoload_with=conn)
        DataTable = Table("Data_StudyNotes",meta, autoload_with=conn)
        metaDataStmnt = MetaTable.select().where(MetaTable.c.NoteID == NoteID)
        dataStmnt = DataTable.select().where(DataTable.c.NoteID == NoteID)
        
        self.noteMetaData = conn.execute(metaDataStmnt).fetchone() #contains data from specified NoteID row of metatable in the form of a tuple
        self.noteData =  conn.execute(dataStmnt).fetchone() #contains data from specified NoteID row of datatable in the form of a tuple
    
    def getMetaData(self):
       return self.noteMetaData
   
    def getData(self):
       return self.noteData
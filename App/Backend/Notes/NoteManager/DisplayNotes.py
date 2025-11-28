from Backend.db.Connection import connection
from sqlalchemy import MetaData,Table

class DisplayNotes:
 currentPage = 1 
 
    
 @classmethod
 def getDisplayNotes(cls): #only selecting the metadata, because we dont need the content data for displaying previews
    skipRows = 10*(cls.currentPage-1)
    CurrentPage_Notes=[]
    conn = connection()
    meta = MetaData()
    MetaTable = Table("Meta_StudyNotes",meta,autoload_with=conn)
    
    limitedRows = MetaTable.select().limit(10).offset(skipRows) #limit takes next 10 rows, from our current row
    displayRows = conn.execute(limitedRows).fetchall()
    for row in displayRows:
        CurrentPage_Notes.append(row)
    return CurrentPage_Notes
        
 @classmethod
 def nextPage(cls):
      cls.currentPage+=1

 @classmethod
 def prevPage(cls):
     cls.currentPage-=1
     

#for the navigating the files
#make sure that the pages that we paginate to actually have content in them
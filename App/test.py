import datetime
from Backend.Notes.noteTemplate import noteTemplate
from Backend.Notes.NoteManager.DisplayNotes import DisplayNotes

# new_note = noteTemplate(
#     title="Electromagnetism",
#     streak=7, 
#     description="Lecture 3 notes",
#     difficulty=2.5,
#     tags=["physics", "em", "fields"],
#     style={"backgroundColor": "#111", "font": "Inter"},
# )

# new_id = new_note.generateNote()

# print("Inserted with ID:", new_id)

x = DisplayNotes()
#print(x.currentPage)
#x.nextPage()
#print(x.currentPage)
#x.nextPage()
#print(x.currentPage)
print(x.getDisplayNotes())
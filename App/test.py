import datetime
from Backend.Notes.noteTemplate import noteTemplate
from App.Backend.Notes.getNoteData import openNote

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

x = openNote(1)
print(x.getData())
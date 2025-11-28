from Backend.Notes.getNoteData import getNoteData
#get the metadata of the selected note, by making getNoteData object and calling getMetadata()
#but if the user actually goes into the selected note, we will get the noteData aswell

isHovering = False
isEntered = False
currentlyHoveringOver = 0 #ID of the note that is being hovered over

def previewContent():
    if isHovering and not isEntered:
       getNoteData().getMetaData(currentlyHoveringOver)
       return isEntered #false
    elif isEntered:
       getNoteData().getData(currentlyHoveringOver)
       return isEntered #true
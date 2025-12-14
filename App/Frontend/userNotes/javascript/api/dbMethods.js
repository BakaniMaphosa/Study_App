async function sendNote(Title,Description,Difficulty,NoteTags,NoteContent) {
  const response = await fetch("http://127.0.0.1:5000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Title: Title,
      Description: Description,
      Difficulty: Difficulty,
      NoteTags: NoteTags,
      NoteContent: NoteContent,
      Pinned: false,
      WordCount: 0,
      AvgReadTime: 0.0,
      Version : 1.0,
      NoteStyle: "No Style",

    })
  });

  const data = await response.json();
  console.log("Backend response:");
  console.log(data);
}


async function getNotes() {
  const response = await fetch("http://127.0.0.1:5000/api/notes");

  console.log("Response status:", response.status);

  const notes = await response.json();
  console.log("Notes:", notes);

  return notes.length;
}

console.log(getNotes())



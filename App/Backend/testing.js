async function sendNote() {
  const response = await fetch("http://127.0.0.1:5000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Title: "Node Test Note",
      Description: "Sent from Node.js",
      Difficulty: 0.5,
      NoteTags: "node,test",
      NoteContent: "This confirms JS ↔ Python communication"
    })
  });

  const data = await response.json();
  console.log("Backend response:");
  console.log(data);
}

sendNote();


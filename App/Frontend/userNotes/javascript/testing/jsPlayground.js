import { sendNote, getNotes} from "./api/dbMethods.js"



  const notes = await getNotes();
  console.log(notes);



let noteCount = 0;
for (let i = 0 ; i < notes ; i++){
   noteCount++;
}

console.log(noteCount);
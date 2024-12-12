import {useState , useEffect} from 'react';

const Textarea = ({placeholder , note , notesOnEdit}) => {

  // console.log("NOTES EDITT " , notesOnEdit);

  const [notes , setNotes] = useState('');

  useEffect(() => {

    setNotes(notesOnEdit);

  } , [note]);
  
  const handleNotes = (e) => {
    setNotes(e.target.value);
    note(e.target.value);
  }

  return (
    <>
      <textarea
        className="w-[480px] h-[120px] border border-secondary rounded-lg py-3 px-4 outline-none resize-none text-sm"
        placeholder={placeholder}
        value={notes}
        onChange={handleNotes}
      ></textarea>
    </>
  );
}

export default Textarea;

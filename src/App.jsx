import React, { useCallback, useEffect, useRef, useState } from 'react' 

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "`~@#$%^&*()_-+=</>,.{}[]?|";

    for(let i = 1; i <= length; i++){
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str[charIndex];
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className='w-full h-screen bg-slate-800 text-white flex justify-center items-center'>
      <div className=" bg-gray-300 p-10 rounded grid gap-4">
      <h1 className=' text-3xl font-sans text-center text-gray-700 font-thin'>Password Generator</h1>
        <div className="flex items-center text-orange-600 flex-wrap">
          <input type="text" value={password} placeholder='password' className='w-96 py-2 px-3 rounded text-xl outline-none' ref={passwordRef} readOnly/>
          <button className='bg-blue-700 px-2 py-2 rounded text-white' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className="text-orange-600 text-lg flex items-center gap-4">
          <label className='cursor-pointer'>
            <input type="range" min={0} max={50} value={length} onChange={(event)=>setLength(parseInt(event.target.value))}/>
            length: {length}
          </label>
          <label className='cursor-pointer'>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev) => !prev)}}/>
            Number
          </label>
          <label className='cursor-pointer'>
            <input type="checkbox" defaultChecked = {charAllowed} onChange={()=>{setCharAllowed((prev) => !prev)}} />
            Character
          </label>
        </div>
      </div>
    </div>
  );
}

export default App
import {useState,useEffect} from 'react';
import {hasWaitingUpdate,applyUpdate} from './client';
export default function UpdateBanner(){const [waiting,setWaiting]=useState(hasWaitingUpdate);useEffect(()=>{const update=()=>setWaiting(hasWaitingUpdate());window.addEventListener('cell-update-ready',update);return ()=>window.removeEventListener('cell-update-ready',update)},[]);return waiting?<div className="update-banner" role="status"><span>גרסה חדשה מוכנה. אפשר לסיים את התרגול ולעדכן בזמן שנוח לך.</span><button onClick={applyUpdate}>עדכון עכשיו</button></div>:null}

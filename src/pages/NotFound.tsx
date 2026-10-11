import {Link} from 'react-router-dom';
export default function NotFound(){return <section className="page-shell empty-state"><span className="eyebrow">אפשר להתחיל מחדש</span><h1>העמוד לא נמצא</h1><p>הכתובת אינה מתאימה לעמוד ביישומון.</p><Link className="button primary" to="/">חזרה לבית</Link></section>}

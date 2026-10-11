import {Link} from 'react-router-dom';
import CellExplorer from '../features/cell/CellExplorer';
export default function Explore(){return <section className="page-shell"><nav className="breadcrumbs"><Link to="/">בית</Link><span>/</span><Link to="/category/structure">מבנה התא</Link><span>/</span><span>מגלים את התא</span></nav><header className="page-heading"><div><span className="eyebrow">לוחצים. מגלים. מבינים.</span><h1>מגלים את התא</h1><p>בחרו מספר באיור או שם ברשימה כדי להכיר את האברון.</p></div></header><CellExplorer/></section>}

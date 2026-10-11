import {usePreferences} from '../features/preferences/PreferencesProvider';
import {Icon} from '../components/Icon';
import {Link,useParams} from 'react-router-dom';
import {findLesson,categories} from '../content';
import LessonContent from '../components/LessonContent';
import SourceList from '../components/SourceList';
import ProcessPlayer from '../features/process/ProcessPlayer';
import NotFound from './NotFound';
export default function Lesson(){const {lessonId}=useParams();const {progress,markLearned}=usePreferences();const l=findLesson(lessonId||'');if(!l)return <NotFound/>;const c=categories.find(c=>c.id===l.categoryId)!;return <article className="page-shell lesson-page"><nav className="breadcrumbs"><Link to="/">בית</Link><span>/</span><Link to={'/category/'+c.id}>{c.title}</Link><span>/</span><span>{l.title}</span></nav><header className="lesson-heading"><span className="eyebrow" dir="ltr">{l.englishTitle}</span><h1>{l.title}</h1><p>{l.summary}</p></header><button className={"learned-toggle "+(progress.learnedIds.includes(l.id)?"done":"")} aria-pressed={progress.learnedIds.includes(l.id)} onClick={()=>markLearned(l.id)}><Icon name="CheckCircle" size={20}/>{progress.learnedIds.includes(l.id)?"סומן כנלמד":"סימון העמוד כנלמד"}</button><LessonContent lesson={l}/>{l.steps&&<ProcessPlayer processId={l.id}/>}<section className="related"><h2>ממשיכים לגלות</h2><div>{l.relatedIds.map(id=><Link key={id} to={'/lesson/'+id}>{findLesson(id)?.title} ←</Link>)}</div></section><SourceList sourceIds={l.sourceIds}/></article>}

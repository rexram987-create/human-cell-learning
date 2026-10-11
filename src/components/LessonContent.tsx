import type {Lesson} from '../content/types';
import MedicalImage from './MedicalImage';
import {Icon} from './Icon';
export default function LessonContent({lesson}:{lesson:Lesson}){return <><div className="reading-panel"><span className="eyebrow">במילים פשוטות</span>{lesson.simple.map(p=><p key={p}>{p}</p>)}<div className="role-callout"><Icon name="Lightbulb"/><div><strong>ומה זה נותן לגוף?</strong><p>{lesson.role}</p></div></div></div>{lesson.imageIds.map(id=><MedicalImage key={id} id={id}/>)}<details className="deeper"><summary><span><Icon name="BookOpen"/>להעמקה</span><span className="deeper-hint">עוד קצת פנימה</span></summary><div>{lesson.deeper.map(p=><p key={p}>{p}</p>)}</div></details></>}

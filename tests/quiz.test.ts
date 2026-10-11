import {test,expect} from 'vitest';
import {questions,gradeAnswer} from '../src/features/quiz/quiz';
import {findLesson} from '../src/content';
test('at least twenty usable questions have explanations and lesson links',()=>{expect(questions.length).toBeGreaterThanOrEqual(20);expect(new Set(questions.map(q=>q.id)).size).toBe(questions.length);for(const q of questions){expect(q.options.length).toBeGreaterThan(2);expect(q.options[q.correctIndex]).toBeTruthy();expect(findLesson(q.lessonId)).toBeTruthy();expect(q.explanation.length).toBeGreaterThan(15)}});
test('correct and incorrect answers both receive explanatory feedback',()=>{const q={id:'x',lessonId:'nucleus',prompt:'?',options:['wrong','correct','other'],correctIndex:1,explanation:'The nucleus stores most cellular DNA.'};expect(gradeAnswer(q,1)).toEqual({correct:true,explanation:q.explanation});expect(gradeAnswer(q,0)).toEqual({correct:false,explanation:q.explanation})});

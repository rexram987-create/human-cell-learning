import {render,screen,fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {test,expect} from 'vitest';
import App from '../src/App';
function open(path:string){render(<MemoryRouter initialEntries={[path]}><App/></MemoryRouter>)}
test('a direct lesson URL shows simple text, expansion and source links',()=>{open('/lesson/mitochondria');expect(screen.getByRole('heading',{name:'מיטוכונדריה',level:1})).toBeInTheDocument();fireEvent.click(screen.getByText('להעמקה'));expect(screen.getByText(/שתי ממברנות/)).toBeVisible();expect(screen.getByRole('link',{name:/NHGRI/})).toHaveAttribute('href','https://www.genome.gov/genetics-glossary/Mitochondria');expect(screen.getByRole('link',{name:'מבנה התא'})).toHaveAttribute('href','/category/structure')});
test.each(['/lesson/missing','/category/missing','/missing'])('unknown path %s offers recovery',(path)=>{open(path);expect(screen.getByRole('heading',{name:'העמוד לא נמצא'})).toBeInTheDocument();expect(screen.getByRole('link',{name:'חזרה לבית'})).toHaveAttribute('href','/')});

import {Routes,Route} from 'react-router-dom';
import PreferencesProvider from './features/preferences/PreferencesProvider';
import Settings from './pages/Settings';
import Practice from './pages/Practice';
import UpdateBanner from './pwa/UpdateBanner';
import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Lesson from './pages/Lesson';
import Glossary from './pages/Glossary';
import Sources from './pages/Sources';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
export default function App(){return <PreferencesProvider><UpdateBanner/><Layout><Routes><Route path="/" element={<Home/>}/><Route path="/category/:categoryId" element={<Category/>}/><Route path="/lesson/:lessonId" element={<Lesson/>}/><Route path="/glossary" element={<Glossary/>}/><Route path="/settings" element={<Settings/>}/><Route path="/practice" element={<Practice/>}/><Route path="/explore" element={<Explore/>}/><Route path="/sources" element={<Sources/>}/><Route path="*" element={<NotFound/>}/></Routes></Layout></PreferencesProvider>}

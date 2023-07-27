import {createRoot} from 'react-dom/client';
import App from './main.jsx'
export function renderToDom(container){
  createRoot(container).render(<App/>)
}
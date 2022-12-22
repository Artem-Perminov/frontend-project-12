import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import init from './init.jsx';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);

const virtualDom = init();

root.render(virtualDom);

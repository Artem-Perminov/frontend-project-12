import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/application.scss';
import init from './init.jsx';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);
const socket = io();

const virtualDom = init(socket);

root.render(virtualDom);

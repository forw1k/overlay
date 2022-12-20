import { modal } from './modules/overlay';
import './index.scss';

const myModal = modal('div', {
  title: 'Title name',
  isClosable: true,
  width: '400px',
  content: 'test content',
});

window.myModal = myModal;
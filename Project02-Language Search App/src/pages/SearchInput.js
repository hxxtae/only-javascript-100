import { debounce } from '../utils/util.js';

export default function SearchInput({ $target, initialValue, onChange }) {
  this.$element = document.createElement('form');
  this.$element.className = 'SearchInput';
  this.state = initialValue;

  $target.appendChild(this.$element);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  // Add: debounce 적용
  this.onChange = debounce(onChange); // onChange.bind(this) -> 생성자 함수 App에서 onChange 함수는 arrow function으로 선언되었기 때문에 이미 bind가 되어 있다.
  
  this.$element.addEventListener('keyup', (e) => {
    const actionIgnoreKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (!actionIgnoreKeys.includes(e.key)) {
      this.onChange(e.target.value);
    }
  });

  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  this.render = () => {
    this.$element.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="${this.state}">
    `
    // Add: focus()
    this.$element.children[0].focus();
  };

  this.render();
}


import { getLocalStorage } from '../utils/storage.js';

export default function SignupPage({ $target, pageKind, onAddNewCard }) {
  this.$element = document.createElement('form');
  this.$element.id = 'form_container';
  this.$name = document.createElement('input');
  this.$email = document.createElement('input');
  this.$nickname = document.createElement('input');
  this.$role = document.createElement('select');
  this.$mbti = document.createElement('select');

  // id
  this.$name.id = 'name';
  this.$email.id = 'email';
  this.$nickname.id = 'nickname';
  this.$role.id = 'role';
  this.$mbti.id = 'mbti';

  // name
  this.$name.name = 'name';
  this.$email.name = 'email';
  this.$nickname.name = 'nickname';
  this.$role.name = 'role';
  this.$mbti.name = 'mbti';

  // placeholder
  this.$name.placeholder = '이름';
  this.$email.placeholder = '이메일';
  this.$nickname.placeholder = '닉네임';

  // required
  this.$name.required = true;
  this.$email.required = true;
  this.$nickname.required = true;

  // pattern
  this.$name.pattern = '^[ㄱㅏ-힣]{2,4}$';
  this.$email.pattern = '^[a-zA-Z0-9]+@grepp.co$';
  this.$nickname.pattern = '^[a-zA-Z]{3,10}$';

  $target.appendChild(this.$element);

  this.state = {
    pageKind
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.render();
  }

  this.onInValid = (event, message) => {
    const target = event.target;
    const targetValue = target.value;
    const reg = new RegExp(target.pattern);
    const patternChk = reg.test(targetValue);
    if (!patternChk) target.setCustomValidity(message);
    else target.setCustomValidity('');
  }

  this.$name.addEventListener('invalid', (e) => {
    const message = '2~4 글자의 한글만 입력이 가능합니다.';
    this.onInValid(e, message);
  })

  this.$email.addEventListener('invalid', (e) => {
    const message = '이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능하며, @grepp.co 형식의 이메일만 입력이 가능합니다.';
    this.onInValid(e, message);
  })

  this.$nickname.addEventListener('invalid', (e) => {
    const message = '대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다.';
    this.onInValid(e, message);
  })
  
  this.$element.addEventListener('submit', (e) => {
    e.preventDefault();
    const isTrusted = e.isTrusted;
    if (!isTrusted) return;
    const newCard = {
      name: e.target[0].value,
      email: e.target[1].value,
      nickname: e.target[2].value,
      role: e.target[3].value,
      mbti: e.target[4].value
    };
    const localStorage = getLocalStorage('personalInfo');
    const sameDataChk = localStorage.find((item) => item.email === newCard.email || item.nickname === newCard.nickname);
    if (sameDataChk) {
      alert('이메일 혹은 닉네임이 이미 등록되어 있습니다.');
      return;
    }
    onAddNewCard(newCard);
    alert('성공적으로 등록되었습니다.');
    e.target.reset();
  })

  this.renderInputs = () => {
    this.$element.children[0].appendChild(this.$name);
    this.$element.children[1].appendChild(this.$email);
    this.$element.children[2].appendChild(this.$nickname);
    this.$element.children[3].appendChild(this.$role);
    this.$element.children[4].appendChild(this.$mbti);
    this.$role.innerHTML = `
      <option value="">직군을 선택해주세요</option>
      <option value="backend">백엔드</option>
      <option value="frontend">프론트엔드</option>
      <option value="fullstack">풀스택</option>
    `;
    this.$mbti.innerHTML = `
      <option value="">MBTI를 선택해주세요</option>
      <option value="ENFJ">ENFJ</option>
      <option value="ENTJ">ENTJ</option>
      <option value="ENFP">ENFP</option>
      <option value="ENTP">ENTP</option>
      <option value="ESFJ">ESFJ</option>
      <option value="ESTJ">ESTJ</option>
      <option value="ESFP">ESFP</option>
      <option value="ESTP">ESTP</option>
      <option value="INFJ">INFJ</option>
      <option value="INTJ">INTJ</option>
      <option value="INFP">INFP</option>
      <option value="INTP">INTP</option>
      <option value="ISFJ">ISFJ</option>
      <option value="ISTJ">ISTJ</option>
      <option value="ISFP">ISFP</option>
      <option value="ISTP">ISTP</option>
    `;
  }

  this.render = () => {
    const { pageKind } = this.state;
    this.$element.innerHTML = `
    ${pageKind === 1 ? `
      <span class="form_elem">
        <label for="name">
          이름<span class="mark">(필수*)</span>
        </label>
      </span>
      <span class="form_elem">
        <label for="email">
          이메일<span class="mark" type="email">(필수*)</span>
        </label>
      </span>
      <span class="form_elem">
        <label for="nickname">
          닉네임<span class="mark">(필수*)</span>
        </label>
      </span>
      <span class="form_elem">
        <label for="role">직군</label>
      </span>
      <span class="form_elem">
        <label for="mbti">MBTI</label>
      </span>
      <span class="form_elem">
        <button type="submit">등록</button>
      </span>
    ` : ''}
    `;
    pageKind === 1 && this.renderInputs();
  }
  this.render();
}


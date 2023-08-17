import { getLocalStorage, setLocalStorage } from "../utils/storage.js";

export default function HomePage({ $target, pageKind, pageCards, onReFetchCards }) {
  this.$element = document.createElement('div');
  this.$element.id = 'cards_container';
  this.$ob = document.createElement('div');
  this.$ob.className = 'sentinel';

  this.state = {
    pageKind,
    pageCards,
  }

  $target.appendChild(this.$element);
  document.body.appendChild(this.$ob);
  
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.render();
  }

  const intersecRef = new IntersectionObserver((entries, observe) => {
    if (!entries[0].isIntersecting) return;
    onReFetchCards();
    observe.unobserve(this.$ob);
  });

  window.addEventListener('scroll', () => {
    intersecRef.observe(this.$ob);
  });

  this.$element.addEventListener('click', (e) => {
    const $target = e.target;
    const $card = $target.parentNode;
    const cardClassName = $card.className.split(' ');
    if (!cardClassName.includes('card')) return;

    const flipped = 'is-flipped';
    $card.classList.toggle(flipped);

    const idx = +$card.attributes.idx.value;
    let cardStatus = [...getLocalStorage('cardStatus')];
    if (cardStatus.length > 0) {
      cardStatus = cardStatus.map((obj) => {
        if (obj.idx === idx) return { ...obj, status: cardClassName.includes(flipped) ? '' : flipped }
        return obj;
      });
    }
    setLocalStorage('cardStatus', cardStatus);
  });

  this.render = () => {
    const { pageCards, pageKind } = this.state;
    const cardStatus = [...getLocalStorage('cardStatus')];
    this.$element.innerHTML = `
      ${pageKind === 0 ? pageCards.map((card, index) => `
        <div idx="${index + 1}" class="card ${cardStatus[index]?.status}">
          <div class="card_plane card_plane--front">${card.nickname}</div>
          <div class="card_plane card_plane--back">${card.mbti}</div>
        </div>
      `).join('') : ''}
    `;
  }
  this.render();
}

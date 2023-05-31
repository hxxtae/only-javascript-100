export default function Suggestion({ $target, initialValue, onSelect }) {

  this.$element = document.createElement('div');
  this.$element.className = 'Suggestion';
  $target.appendChild(this.$element);

  this.state = {
    selectedIndex: 0,
    items: initialValue.items,
    keyword: initialValue.keyword
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    };
    this.render();
  }

  // Add: keyword 강조하기
  this.renderMatchItem = (keyword, item, idx) => {
    if (!item.includes(keyword)) return item;
    const matchKeyword = item.match(new RegExp(keyword, 'gi'))[0];
    return item.replace(keyword, `<span class="Suggestion__item--matched" data-index="${idx}">${matchKeyword}</span>`);
    // <li>태그의 dataset과 <span> 태그의 dataset이 둘다 똑같이 존재해야 클릭 이벤트로 dataset으로 값을 가져올 때 
    // li나 span 태그 아무거나 클릭 하여도 dataset의 값을 가져올 수 있다. (자잘한 오류 조심)
  }

  $target.addEventListener('keyup', (e) => {
    if (this.state.items.length > 0) {
      const { selectedIndex } = this.state;
      const lastIndex = this.state.items.length - 1;
      const navigationKeys = ['ArrowUp', 'ArrowDown'];
      let nextIndex = selectedIndex;
      
      if(navigationKeys.includes(e.key)) {
        if(e.key === 'ArrowUp') {
          nextIndex = (selectedIndex === 0 ? lastIndex : nextIndex - 1);
        } else if(e.key === 'ArrowDown') {
          nextIndex = (selectedIndex === lastIndex ? 0 : nextIndex + 1);
        }
        this.setState({
          selectedIndex: nextIndex
        });
      } else if (e.key === 'Enter') {
        onSelect(this.state.items[this.state.selectedIndex]);
      }
    }
  });

  this.$element.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const { index } = e.target.dataset; // caution!
      try {
        onSelect(this.state.items[index]);
      } catch(e) {
        alert('무언가 잘못되었습니다! 선택할 수 없습니다.');
      }
    }
    
  })

  this.render = () => {
      const { items = [], selectedIndex, keyword } = this.state;
      if(items.length > 0) {
          this.$element.style.display = 'block';
          this.$element.innerHTML = `
          <ul>
              ${items.map((item, idx) => `
                  <li class="${idx === selectedIndex ? 'Suggestion__item--selected' : ''}" data-index="${idx}">${this.renderMatchItem(keyword, item, idx)}</li>
              `).join('')}
          </ul>
          `;
      } else {
          this.$element.style.display = 'none';
          this.$element.innerHTML = '';
      }
  }
  
  this.render();
}

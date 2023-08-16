export default function PageNation({ $target, onPageClick }) {
  this.$element = document.createElement('div');
  this.$element.id = 'pagination';
  this.$element.className = 'area';

  this.state = {
    selectedPage: 1,
    buttonCount: 0,
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  $target.appendChild(this.$element);

  this.$element.addEventListener('click', (e) => {
    const $btn = e.target.closest('button');
    if($btn) {
      const notPage = ['first', 'end'];
      let page = e.target.dataset.btn;
      if(notPage.includes(page)) {
        if(page === 'first') page = 1;
        else if(page === 'end') page = this.state.buttonCount;
      }
      onPageClick(page);
      this.setState({
        selectedPage: page
      });
    }
  })

  this.render = () => {
    const { buttonCount, selectedPage } = this.state;
    this.$element.innerHTML = `
      <button class="arrow" data-btn="first"><<</button>
      ${Array(buttonCount).fill(0).map((item, index) => `
      <button style="${selectedPage == index + 1 ? 'color: red' : ''}" data-btn="${index + 1}">${index + 1}</button>
      `).join('')}
      <button class="arrow" data-btn="end">>></button>
    `;
  }

  this.render();
}

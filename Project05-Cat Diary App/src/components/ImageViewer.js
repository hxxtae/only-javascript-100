import { IMAGE_PATH } from '../apis/path.js';

export default function ImageViewer({ $target, initState }) {
  this.$element = document.createElement('div');
  this.$element.className = 'Modal ImageViewer';
  $target.insertAdjacentElement('afterend', this.$element);

  this.state = {
    viewState: initState,
    filePath: '',
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    this.render();
  }

  this.$element.addEventListener('click', (e) => {
    console.log('click event')
    const $target = e.target;
    if($target.classList[0] !== 'Modal') return;
    this.setState({
      viewState: false,
    });
  })

  window.addEventListener('keyup', (e) => {
    console.log('keyup event')
    console.log(e.key)
    if(e.key !== 'Escape') return;
    this.setState({
      viewState: false,
    });
  })

  this.render = () => {
    const { viewState, filePath } = this.state;
    if (viewState) {
      this.$element.style.display = 'block';
      this.$element.innerHTML = `
        <div class="content">
          <img src="${IMAGE_PATH}${filePath}">
        </div>
      `;
    } else {
      this.$element.style.display = 'none';
      this.$element.innerHTML = ``;
    }
  }
  this.render();
}

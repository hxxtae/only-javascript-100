export default function Header({ $target, onChange }) {
  this.$element = document.createElement('header');
  
  $target.appendChild(this.$element);

  this.$element.addEventListener('click', (e) => {
    const $span = e.target.closest('span');
    if(!$span) return;

    const btnId = ['menu_home', 'menu_signup'];
    const idIndex = btnId.indexOf($span.id);
    const BASE_URL = `${location.protocol}//${location.host}`;
    if(idIndex !== -1) {
      if(idIndex === 0) history.pushState(null, null, `${BASE_URL}/web/`);
      else if(idIndex === 1) history.pushState(null, null, `${BASE_URL}/web/signup/`);
      onChange(idIndex);
    }
  })

  this.render = () => {
    this.$element.innerHTML = `
      <div class="header header_left">
          <span class="menu_name" id="menu_home">HOME</span>
      </div>
      <div class="header header_right">
          <span class="menu_name" id="menu_signup">SIGNUP</span>
      </div>
    `;
  }

  this.render();
}

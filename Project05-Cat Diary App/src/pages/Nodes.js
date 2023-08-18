export default function Nodes({ $target, nodes, nodeData, onRefetch, onClickImage }) {
  this.$element = document.createElement('div');
  this.$element.className = 'Nodes';
  $target.appendChild(this.$element);

  this.state = {
    nodes: [...nodes],
    nodeData,
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    this.render();
  }

  this.$element.addEventListener('click', (e) => {
    const $target = e.target;
    const $item = $target.closest('div');
    if($item.className !== 'Node') return;

    const previd = $item.dataset.previd;
    if(previd != undefined) {
      onRefetch(previd);
      return;
    }

    const key = $item.dataset.key;
    const breadObj = this.state.nodes[key];
    const { id, type, filePath } = breadObj;
    if(type === 'DIRECTORY') {
      onRefetch(id, breadObj);
      return;
    }
    if (type === 'FILE' && !!filePath) {
      onClickImage(filePath);
      return;
    }
  });

  this.render = () => {
    const { nodes, nodeData } = this.state;
    this.$element.innerHTML = `
      ${nodeData.id !== '0' ? `
        <div class="Node" data-previd="${nodeData.parent?.id ?? 0}">
          <img src="./assets/prev.png">
        </div>
      ` : ''}
      ${nodes?.map((item, index) => `
        <div class="Node" data-key="${index}">
          <img src="${item.filePath ? './assets/file.png' : './assets/directory.png' }">
          <div>${item.name}</div>
        </div>
      `).join('')}
    `;
  }

  this.render();
}

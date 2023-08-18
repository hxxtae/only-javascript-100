import { fetchData } from "./apis/api.js";
import BreadCrumb from "./pages/BreadCrumb.js";
import Nodes from "./pages/Nodes.js";
import Loading from "./components/Loading.js";
import ImageViewer from './components/ImageViewer.js';

export default function App({ $target }) {
  this.state = {
    breadCrumbs: [{
      id: '0',
      name: 'root',
      type: 'DIRECTORY',
      filePath: null,
      parent: null
    }],
    nodes: [],
  }

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    const breadCrumbLastIndex = this.state.breadCrumbs.length - 1;
    const nodeData = this.state.breadCrumbs[breadCrumbLastIndex];
    breadCrumb.setState({
      breadCrumbs: [...this.state.breadCrumbs],
    });
    nodes.setState({
      nodes: [...this.state.nodes],
      nodeData,
    });
    loading.setState({
      isLoading: false,
    });
  }

  window.addEventListener('load', async () => {
    const { node_id } = this.state.breadCrumbs[0].id;
    const datas = await fetchData(node_id);
    console.log(datas)
    this.setState({
      nodes: datas,
    });
  });
  
  this.onFetchError = (err) => {
    loading.setState({
      isLoading: false,
    });
    throw new Error(err);
  }

  this.onRefetch = async (id, breadObj) => {
    if (this.state.breadCrumbs[this.state.breadCrumbs.length - 1].id === id) return;
    loading.setState({
      isLoading: true,
    });
    const datas = await fetchData(id).catch(this.onFetchError);
    const findDir = this.state.breadCrumbs.findIndex((node) => node.id === id);
    if(findDir !== -1) {
      this.setState({
        breadCrumbs: this.state.breadCrumbs.slice(0, findDir + 1),
        nodes: datas,
      });
    } else {
      this.setState({
        breadCrumbs: [...this.state.breadCrumbs, breadObj],
        nodes: datas,
      });
    }
    console.log(this.state.breadCrumbs);
  }
  
  this.onClickImage = (path) => {
    imageViewer.setState({
      viewState: true,
      filePath: path,
    });
  }

  const breadCrumb = new BreadCrumb({
    $target,
    breadCrumbs: this.state.breadCrumbs,
    onRefetch: this.onRefetch,
  });

  const nodes = new Nodes({
    $target,
    nodes: this.state.nodes,
    nodeData: this.state.breadCrumbs[0],
    onRefetch: this.onRefetch,
    onClickImage: this.onClickImage,
  });

  const loading = new Loading({
    $target,
    initState: true,
  });
  
  const imageViewer = new ImageViewer({
    $target,
    initState: false,
  });

}

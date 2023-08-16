import { fetchEmployDatas } from './apis/api.js';
import DropDown from './pages/DropDown.js';
import EmployTable from './pages/EmployTable.js';
import PageNation from './pages/PageNation.js';

export default function App({ $target }) {
  this.state = {
    fetchDatas: [{
      "name": "",
      "title": "",
      "email": "",
      "role": ""
    }],
    pageShowCount: 5
  }
    
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState
    }
    employTalbe.setState({
      employDatas: [...this.state.fetchDatas],
      pageShowCount: this.state.pageShowCount
    });
    pageNation.setState({
      selectedPage: 1,
      buttonCount: Math.ceil(this.state.fetchDatas.length / this.state.pageShowCount),
    });
  }

  window.addEventListener('load', async () => {
    const fetchDatas = await fetchEmployDatas();
    this.setState({
      fetchDatas
    });
  });

  this.onPageClick = (nextPage) => {
    const { fetchDatas, pageShowCount } = this.state;
    if(fetchDatas.length > 0) {
      const employDatas = [...fetchDatas];
      const SHOW_LENGTH = pageShowCount;
      const EMPLOY_LENGTH = employDatas.length;
      const pageKind = ['first', 'end'];
      const lastPage = parseInt((EMPLOY_LENGTH - 1) / SHOW_LENGTH) * SHOW_LENGTH;
      let filterDatas = employDatas;
      if(pageKind.includes(nextPage)) {
        if(nextPage === 'first') filterDatas = employDatas.slice(0, SHOW_LENGTH);
        else if(nextPage === 'end') filterDatas = employDatas.slice(lastPage);
      } else {
        const end = (nextPage * SHOW_LENGTH);
        const start = end - SHOW_LENGTH;
        filterDatas = employDatas.slice(start, end);
      }
      employTalbe.setState({
        employDatas: [...filterDatas],
      });
    }
  }

  this.onSelectShow = (count) => {
    this.setState({
      fetchDatas: this.state.fetchDatas,
      pageShowCount: count,
    });
  }

  const dropDown = new DropDown({
    $target,
    pageShowCount: this.state.pageShowCount,
    onSelectShow: this.onSelectShow
  });

  const employTalbe = new EmployTable({ 
    $target, 
    employDatas: this.state.fetchDatas,
    pageShowCount: this.state.pageShowCount
  });

  const pageNation = new PageNation({
    $target,
    onPageClick: this.onPageClick,
  });
}

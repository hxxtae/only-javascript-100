import SearchInput from "./pages/SearchInput.js";
import SelectedLanguages from './pages/SelectedLanguages.js';
import Suggestion from "./pages/Suggestion.js";
import { fetchLanguage } from "./apis/api.js";
import { getLocalStorage, setLocalStorage } from './utils/util.js';

export default function App({ $target }) {
  this.state = {
    fetchLanguage: getLocalStorage()?.fetchLanguage || [],
    selectedLanguages: getLocalStorage()?.selectedLanguages || [],
    keyword: getLocalStorage()?.keyword || ''
  };
  // removeLocalStorage();
  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    }
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.fetchLanguage,
      keyword: this.state.keyword
    });
    setLocalStorage(this.state);
    console.log(getLocalStorage())
  };

    // Add: set state of LocalStorage (다른 방법으로 생성자 함수의 parameter에 선언하는 방법이 있다. - 초기값)
  window.addEventListener('load', () => {
    this.setState(this.state);
    selectedLanguageObj.setState(this.state.selectedLanguages);
    searchInput.setState(this.state.keyword);
  });
    
  this.onChange = async (keyword) => {
    const languages = await fetchLanguage(keyword);
    if (keyword.trim().length === 0) {
      this.setState({
        fetchLanguage: [],
        keyword
      });
      return;
    }
    this.setState({
      fetchLanguage: languages,
      keyword
    });
  }

  this.onSelect = (language) => {
    alert(language);
        
    const nextSelectedLanguages = [...this.state.selectedLanguages];
    const index = nextSelectedLanguages.findIndex((selectedLanguage) => language === selectedLanguage);
    if (index > -1) {
      nextSelectedLanguages.splice(index, 1);
    }
    nextSelectedLanguages.push(language);

    this.setState({
      selectedLanguages: nextSelectedLanguages
    });
    selectedLanguageObj.setState(this.state.selectedLanguages);
  }

  const selectedLanguageObj = new SelectedLanguages({
    $target,
    initialValue: []
  })

  const searchInput = new SearchInput({
    $target,
    initialValue: '',
    onChange: this.onChange
  });

  const suggestion = new Suggestion({
    $target,
    initialValue: { 
      selectedIndex: 0,
      items: [],
      keyword: ''
    },
    onSelect: this.onSelect
  });    
}

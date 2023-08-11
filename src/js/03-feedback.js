import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
  };
  
  handleLocalStorage();
  
  refs.form.addEventListener('submit', handleSubmit);
  refs.form.addEventListener('input', throttle(handleInput, 500));
  
  function handleInput() {
    const formData = {
      email: refs.input.value,
      message: refs.textarea.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    if (localStorage.getItem(STORAGE_KEY)) {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      console.log(data);
    }
    localStorage.removeItem(STORAGE_KEY);
    refs.form.reset();
  }
  
  function handleLocalStorage() {
    const defaultvalue = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!defaultvalue) {
      return;
    }
    refs.input.value = defaultvalue.email || '';
    refs.textarea.value = defaultvalue.message || '';
  }
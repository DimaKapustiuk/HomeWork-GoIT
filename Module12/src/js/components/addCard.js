const addCard = (function () {
	const handleButtonSubmitForm = (event) => {
		event.preventDefault();
		//= template.js

		refs.root.insertAdjacentHTML('afterbegin', markup)
	}

	//= refs.js
  
	refs.form.addEventListener('submit', handleButtonSubmitForm)
})();
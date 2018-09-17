;(function(document) {
  
  const api = {
     baseUrl: 'https://api.linkpreview.net/?key=5b9a45cc81f339fa8928c270076c0ef75e4182d8266b4&q=',
     getObjAPI(userUrl) {
       return fetch(`${this.baseUrl}${userUrl}`)
         .then(response => {
           if (response.ok) return response.json();

           throw new Error('Error in response')
         })
         .catch(error => alert(error))
     },
   }

   function addLocalStorage(data) {
   	 localStorage.setItem(`user-bookmarks`, JSON.stringify(data));
   }

   function getLocalStorage() {
   	const data = JSON.parse(localStorage.getItem(`user-bookmarks`));

    return data;
   }

   function filteredArray (array, url) {
   		return array.filter(obj => obj.url !== url);
   }


   document.addEventListener('DOMContentLoaded', () => {
		const dataStorage = getLocalStorage();
		const arrObj = dataStorage ? dataStorage : [];
	
     const refs = selectRefs();

     function selectRefs() {
       const refs = {};

       refs.form = document.querySelector('.form');
       refs.input = document.querySelector('.input-user');
       refs.root = document.querySelector('.root');

       return refs;
     }

     const markup = arrObj.reduce((acc, obj) => acc + createCardWithObj(obj), '');
     
     refs.root.insertAdjacentHTML('afterbegin', markup);
     
     refs.form.addEventListener('submit', handleFormBySubmit);
     refs.root.addEventListener('click', handleButtonRemoveCard);

     
     function handleFormBySubmit(event) {
       event.preventDefault();
       const userUrl = refs.input.value;

        api.getObjAPI(userUrl).then(obj => {
        	if(obj === undefined) return;

        	arrObj.unshift(obj)
       		addLocalStorage(arrObj);

         refs.root.insertAdjacentHTML('afterbegin', createCardWithObj(obj));
       })

       refs.form.reset()
     }

     function handleButtonRemoveCard({ target }) {
       if (target.nodeName !== 'BUTTON') return;

       removeCard(target)
     }

     function removeCard(target) {
       const card = target.closest('#card');
       const url = card.querySelector('.card-link').href;
       const data = getLocalStorage()

       addLocalStorage(filteredArray(data, url));
       
       card.remove();
     }

     function createCardWithObj(obj) {
       const template = Handlebars.templates.card(obj);

       return template;
     }
   })
 })(document)

/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="https://placeimg.com/1000/400/any" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
  { preview: 'img/preview-1.jpeg', fullview: 'img/fullwiew-1.jpg', alt: "alt text 1" },
  { preview: 'img/preview-2.jpeg', fullview: 'img/fullview-2.jpeg', alt: "alt text 2" },
  { preview: 'img/preview-3.jpeg', fullview: 'img/fullview-3.jpeg', alt: "alt text 3" },
  { preview: 'img/preview-4.jpeg', fullview: 'img/fullview-4.jpeg', alt: "alt text 4" },
  { preview: 'img/preview-5.jpeg', fullview: 'img/fullview-5.jpeg', alt: "alt text 5" },
  { preview: 'img/preview-6.jpeg', fullview: 'img/fullview-6.jpeg', alt: "alt text 6" },
];

const gallery = document.querySelector('.js-image-gallery');
const createFullView = () => document.createElement('div');
const createPreview = () => document.createElement('ul');
const createLi = () => document.createElement('li');
const createImg = () => document.createElement('img');

const createImageFullview = ({ fullview, alt }) => {
  const fullviewDiv = createFullView();
  const imageFullview = createImg();

  imageFullview.src = fullview;
  imageFullview.alt = alt;
  fullviewDiv.append(imageFullview);

  return fullviewDiv;
}

const createImagePreview = ({ preview, fullview, alt }) => {
  const imagePreview = createImg();

  imagePreview.src = preview;
  imagePreview.alt = alt;
  imagePreview.dataset.fullview = fullview;

  return imagePreview;
}

const createPreviewItem = obj => {
  const itemPreview = createLi();
  const imagePreview = createImagePreview(obj);

  itemPreview.classList.add('image-wrapper')
  itemPreview.append(imagePreview);

  return itemPreview;
};

const paintPreviwItem = images => {
  const addImages = images.map(image => createPreviewItem(image));

  return addImages;
};

const hoverDiv = () => {
  const imageWrapper = document.querySelectorAll('.image-wrapper');

  const randColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
  };

  imageWrapper.forEach(val => {

    val.onmouseover = () => {
      val.style.border = `10px solid ${randColor()}`;
    };

    val.onmouseout = () => {
      val.style.border = '10px solid #fff';
    };
  });
};


const onLoad = () => {
  const fullview = createImageFullview(galleryItems[0]);
  const list = createPreview();
  const images = paintPreviwItem(galleryItems);
  const fullImage = fullview.querySelector('img');

  const onClickImage = event => {
    const dataSrc = event.target.dataset.fullview;
    const imgAlt = event.target.alt;

    if (event.target !== event.currentTarget) {
      fullImage.src = dataSrc;
      fullImage.alt = imgAlt;
    }
  };

  fullview.classList.add('fullview');
  list.classList.add('preview');
  list.append(...images);
  gallery.append(fullview, list);

  list.addEventListener('click', onClickImage);
  hoverDiv();
};

document.addEventListener('DOMContentLoaded', onLoad);

// new Gallery({
//   items: galleryItems,
//   parentNode: document.querySelector('.image-gallery'),
//   defaultActiveItem: 1
// });

const galleryItems = [
  { preview: 'img/preview-1.jpeg', fullview: 'img/fullwiew-1.jpg', alt: "alt text 1" },
  { preview: 'img/preview-2.jpeg', fullview: 'img/fullview-2.jpeg', alt: "alt text 2" },
  { preview: 'img/preview-3.jpeg', fullview: 'img/fullview-3.jpeg', alt: "alt text 3" },
  { preview: 'img/preview-4.jpeg', fullview: 'img/fullview-4.jpeg', alt: "alt text 4" },
  { preview: 'img/preview-5.jpeg', fullview: 'img/fullview-5.jpeg', alt: "alt text 5" },
  { preview: 'img/preview-6.jpeg', fullview: 'img/fullview-6.jpeg', alt: "alt text 6" },
];


class Gallery {
  constructor({ items, parentNode, defaultActiveItem }) {
    this.items = items,
    this.parentNode = parentNode,
    this.defaultActiveItem = defaultActiveItem

    document.addEventListener("DOMContentLoaded", this.onLoad.bind(this));
  }

  static createElement(elem) {
    return document.createElement(elem);
  }


  static createImage(src, alt) {
    const image = Gallery.createElement('img');

    image.src = src;
    image.alt = alt;

    return image;
  }

   static createImageFullview({ fullview, alt }) {
    const fullviewDiv = Gallery.createElement('div');
    const imageFullview = Gallery.createImage(fullview, alt);

    fullviewDiv.append(imageFullview);

    return fullviewDiv;
  }


  static createImagePreview({ preview, fullview, alt }) {
    const imagePreview = Gallery.createImage(preview, alt);

    imagePreview.dataset.fullview = fullview;

    return imagePreview;
  }

  static createPreviewItem(obj) {
    const itemPreview = Gallery.createElement('li');
    const imagePreview = Gallery.createImagePreview(obj);

    itemPreview.classList.add('image-wrapper');
    itemPreview.append(imagePreview);

    return itemPreview;
  }

 static paintPreviwItem(images) {
    const addImages = images.map(image => Gallery.createPreviewItem(image));

    return addImages;
  }

  static randColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

    return color;
  }

  static hoverDiv() {
    const imageWrapper = document.querySelectorAll('.image-wrapper');

    imageWrapper.forEach(val => {

      val.addEventListener('mouseover', () => {
        val.style.border = `10px solid ${Gallery.randColor()}`;
      });

      val.addEventListener('mouseout', () => {
        val.style.border = '10px solid #fff';
      });
    });
  }
 onClickImage(fullImage){
  return event => {
      const dataSrc = event.target.dataset.fullview;
      const imgAlt = event.target.alt;
      
      if(event.target.classList.contains('image-wrapper')) return;

      if (event.target !== event.currentTarget) {
        fullImage.src = dataSrc;
        fullImage.alt = imgAlt;
      }
    }
 }
 
  onLoad() {
   const fullview = Gallery.createImageFullview(this.items[this.defaultActiveItem]);
    const list = Gallery.createElement('ul');
    const images = Gallery.paintPreviwItem(this.items);
    const fullImage = fullview.querySelector('img');
    console.log(fullImage)

    fullview.classList.add('fullview');
    list.classList.add('preview');
    list.append(...images);
    this.parentNode.append(fullview, list);

    list.addEventListener('click', this.onClickImage(fullImage));
    Gallery.hoverDiv();
  }
}

 new Gallery({
 items: galleryItems,
 parentNode: document.querySelector('.image-gallery'),
 defaultActiveItem: 2
})


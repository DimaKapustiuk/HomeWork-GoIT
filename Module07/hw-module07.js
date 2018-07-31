/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [{
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-3.com'
  }
];

const createMainDiv = () => {
  const div = document.createElement('div')
  div.classList.add('post')

  return div;
}

const createPostImg = img => {
  const image = document.createElement('img');
  image.setAttribute('src', img);
  image.setAttribute('alt', "post image");

  return image;
}

const createPostTitle = title => {
  const h2 = document.createElement('h2');
  h2.classList.add('post__title');
  h2.textContent = title;

  return h2;
}

const createPostParagraph = text => {
  const paragraph = document.createElement('p');
  paragraph.classList.add('post__text');
  paragraph.textContent = text;

  return paragraph;
}

const createPostButton = link => {
  const btn = document.createElement('a');
  btn.classList.add('button');
  btn.textContent = 'Read More';
  btn.href = link;

  return btn;
}

const createPostCard = ({ img, title, text, link }) => {
  const list = document.querySelector('.root');
  const post = createMainDiv();
  const postImage = createPostImg(img);
  const postTitle = createPostTitle(title);
  const postParagraph = createPostParagraph(text);
  const postButton = createPostButton(link);

  post.append(postImage, postTitle, postParagraph, postButton);
  list.append(post);
}

const createCards = arr => {
  const posts = arr.map(post => createPostCard(post));

  return posts;
}

createCards(posts);

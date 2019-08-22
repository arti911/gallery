import axios from 'axios';

export default class DownloadField {
  constructor(parent) {
    this.parent = parent;
    this.btnDownload = Array.from(this.parent.querySelectorAll('.download-field__load'));
    this.galleryContainer = document.querySelector('.gallery');

    this.btnDownload.forEach(button => {
      button.addEventListener('click', () => {
        if (button.getAttribute('data-type') === 'url') {
          const input = button.previousElementSibling;

          if (input.value !== '' && !input.value.includes('.json')) {
            const img = DownloadField.createImage(input.value);

            img.onload = () => {
              this.addImage(img);
              input.value = '';
            };

            img.onerror = () => {
              input.value = '';
              alert('Адрес должен ввести на изображение или JSON файл');
            };
          } else if (input.value.includes('.json')) {
            axios
              .get(input.value, {
                headers: {},
              })
              .then(response => console.log(response));
          } else {
            alert('Пустое поле. Напишите адрес до изображения или JSON файла');
          }
        }
      });
    });
  }

  static createImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  addImage(img) {
    const figure = document.createElement('figure');
    figure.className = 'gallery__item';
    figure.prepend(img);
    this.galleryContainer.prepend(figure);
  }
}

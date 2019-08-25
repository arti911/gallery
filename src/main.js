import 'normalize.css';
import axios from 'axios';

import './main.scss';

new Vue({
  el: '#app',
  data: {
    fieldByLink: true,
    url: '',
    file: null,
    filePlaceholder: '+ Выберите файл с компьютера',
    images: [],
  },
  methods: {
    addImagesFromJson(data) {
      if (data.galleryImages) {
        const images = data.galleryImages;

        for (let i = 0; i < images.length; i += 1) {
          this.images.unshift(images[i].url);
        }
      } else {
        alert('Загружаемый JSON не содержит поля galleryImages');
      }
    },
    addImageUrl() {
      if (this.url.includes('.json')) {
        axios
          .get(this.url)
          .then(response => this.addImagesFromJson(response.data))
          .catch(error => console.log(error));
        this.url = '';
      } else {
        const img = new Image();
        img.src = this.url;

        img.onload = () => {
          this.images.unshift(this.url);
          this.url = '';
        };

        img.onerror = () => {
          alert('Адрес должен ввести на изображение или JSON файл');
          this.url = '';
        };
      }
    },

    getFile(event) {
      this.file = event.target.files[0];
      this.filePlaceholder = this.file.name;
    },

    addImageFile() {
      const reader = new FileReader();
      const typeFile = this.file.type;

      if (typeFile.includes('json')) {
        reader.onloadend = () => this.addImagesFromJson(JSON.parse(reader.result));

        reader.readAsText(this.file);
      } else if (typeFile.includes('image')) {
        reader.onload = () => this.images.unshift(reader.result);

        reader.readAsDataURL(this.file);
      } else {
        alert('Загружайте файлы только в формате JSON либо JPG/PNG/GIF');
      }

      this.file = null;
      this.filePlaceholder = '+ Выберите файл с компьютера';
    },
  },
});

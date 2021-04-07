import template from './Resources/Images/template.png';
import placeholder from './Resources/Images/placeholder.png';

type itemState = {
  name: string;
  description: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: any) => void;
  handleTextChanged: (e: any) => string;
  handleFileChanged: (e: any) => Promise<string>;
};

const itemStore: itemState = {
  name: '프란의 반지',
  description: `의적으로 명성을 날린 프란의 반지
  장비 중량이 적을수록 공격력이 높아진다
              
  바람의 힘을 빌어 싸웠다고 하는 프란은
  미력하고 가난한 자들의 영웅이다
  그리고 그들은 이것이 지어낸 이야기라고 알고 있다
  의적으로 명성을 날린 프란의 반지
  장비 중량이 적을수록 공격력이 높아진다
              
  바람의 힘을 빌어 싸웠다고 하는 프란은
  미력하고 가난한 자들의 영웅이다
  그리고 그들은 이것이 지어낸 이야기라고 알고 있다`,
  setName: (name: string) => {
    document.getElementById('itemName')!.innerText = name;
  },
  setDescription: (description: string) => {
    document.getElementById('itemDescription')!.innerText = description;
  },
  setImage: (image: string) => {
    let itemImage = document.getElementById('itemImage') as HTMLImageElement;
    itemImage.src = image;
  },
  handleTextChanged: (e) => {
    return e.target.value;
  },
  handleFileChanged: (e) => {
    return new Promise((resolve, reject) => {
      if (e.target.files != null) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
          if (reader.result != null) {
            let result = e.target!.result as string;
            resolve(result);
          }
        };
        reader.onerror = (e) => {
          reject(e);
        };
      }
    });
  },
};

const bindItemEvents = () => {
  document.getElementById('itemNameInput')!.addEventListener('input', (e) => {
    itemStore.setName(itemStore.handleTextChanged(e));
  });
  document
    .getElementById('itemDescriptionInput')!
    .addEventListener('input', (e) => {
      itemStore.setDescription(itemStore.handleTextChanged(e));
    });
  document.getElementById('itemImageInput')!.addEventListener('change', (e) => {
    itemStore
      .handleFileChanged(e)
      .then((image) => {
        console.log(image);
        itemStore.setImage(image);
      })
      .catch((image) => {
        console.log(image);
        itemStore.setImage(image);
      });
  });
};

const init = () => {
  let ImgTemplate = document.getElementById(
    'templateImage',
  )! as HTMLImageElement;
  ImgTemplate.src = template;

  let ImgPlaceholder = document.getElementById(
    'itemImage',
  )! as HTMLImageElement;
  ImgPlaceholder.src = placeholder;

  bindItemEvents();
};

init();

export default {};

import templateImage from './Resources/Images/template.png';

type itemState = {
  name: string;
  description: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  getValue: (e: any) => string;
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
  getValue: (e) => {
    return e.target.value;
  },
};

const bindItemEvents = () => {
  document.getElementById('itemNameInput')!.addEventListener('input', (e) => {
    itemStore.setName(itemStore.getValue(e));
  });
  document
    .getElementById('itemDescriptionInput')!
    .addEventListener('input', (e) => {
      itemStore.setDescription(itemStore.getValue(e));
    });
};

const init = () => {
  let ImgTemplateImage = document.getElementById(
    'templateImage',
  )! as HTMLImageElement;
  ImgTemplateImage.src = templateImage;
  bindItemEvents();
};

init();

export default {};

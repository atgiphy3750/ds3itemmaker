import templateImage from './Resources/Images/template.png';

type countState = {
  count: number;
  increase: () => void;
  decrease: () => void;
  draw: () => void;
};

const countStore: countState = {
  count: 0,
  increase: () => countStore.count++,
  decrease: () => countStore.count--,
  draw: () =>
    (document.getElementById('count')!.innerHTML = countStore.count.toString()),
};

const bindEvents = () => {
  document.getElementById('increaseCount')!.addEventListener('click', () => {
    countStore.increase();
    countStore.draw();
  });
  document.getElementById('decreaseCount')!.addEventListener('click', () => {
    countStore.decrease();
    countStore.draw();
  });
};

const init = () => {
  let ImgTemplateImage = document.getElementById(
    'templateImage',
  )! as HTMLImageElement;
  ImgTemplateImage.src = templateImage;
  countStore.draw();
  bindEvents();
};

init();

export default {};

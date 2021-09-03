import template from './Resources/Images/template.jpg';

type itemState = {
  name: string;
  description: string;
  image: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: any) => void;
};

const itemStore: itemState = {
  name: '',
  description: '',
  image: '',
  setName: (name: string) => {
    itemStore.name = name;
  },
  setDescription: (description: string) => {
    itemStore.description = description;
  },
  setImage: (image: string) => {
    itemStore.image = image;
  },
};

const getInputValue = (id: string) => {
  return (document.getElementById(id) as HTMLInputElement).value;
};

const toBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const setItem = async () => {
  const name = getInputValue('InpItemName');
  const description = getInputValue('InpItemDesc');
  itemStore.setName(name);
  itemStore.setDescription(description);

  const image = document.getElementById('InpItemImage') as HTMLInputElement;
  if (image.files) {
    const file = image.files[0];
    await toBase64(file)
      .then((img) => itemStore.setImage(img))
      .catch(() =>
        itemStore.setImage(
          'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        ),
      );
  }
};

type FontStyles = {
  fontSize: string;
  fontColor: string;
  lineHeight: number;
  pos: {
    x: number;
    y: number;
  };
};

type Styles = {
  [key: string]: {
    fontUrl: string;
    fontFamily: string;
    name: Omit<FontStyles, 'lineHeight'>;
    description: FontStyles;
    img: {
      target: number;
      x: number;
      y: number;
    };
  };
};

const styles: Styles = {
  ds3: {
    fontUrl:
      'https://cdn.jsdelivr.net/font-nanum/1.0/nanummyeongjo/v2/NanumMyeongjo-Regular.woff',
    fontFamily: 'nanum',
    name: {
      fontSize: '32pt',
      fontColor: '#ffffff',
      pos: {
        x: 50,
        y: 64,
      },
    },
    description: {
      fontSize: '32pt',
      fontColor: '#ffffff',
      lineHeight: 58,
      pos: {
        x: 50,
        y: 868,
      },
    },
    img: {
      target: 350,
      x: 0,
      y: 300,
    },
  },
};

const createCanvas = async () => {
  const canvas = document.getElementById('CnvImage') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const selectGame = document.getElementById('SelectGame') as HTMLSelectElement;
  const game = selectGame.options[selectGame.selectedIndex].value;

  const style = styles[game];

  // template Image
  const templateImage = new Image();
  await new Promise(
    (r) => ((templateImage.onload = r), (templateImage.src = template)),
  );
  ctx.drawImage(templateImage, 0, 0);

  const f = `url('${style.fontUrl}') format('woff')`;
  const font = new FontFace(style.fontFamily, f);
  await font.load();
  document.fonts.add(font);

  // item name
  ctx.font = `${style.name.fontSize} ${style.fontFamily}`;
  ctx.fillStyle = style.name.fontColor;
  ctx.fillText(itemStore.name, style.name.pos.x, style.name.pos.y);

  // item description
  ctx.font = `${style.description.fontSize} ${style.fontFamily}`;
  const lineHeight = style.description.lineHeight;
  const lines = itemStore.description.split('\n');
  lines.forEach((line, i) => {
    ctx.fillText(
      line,
      style.description.pos.x,
      style.description.pos.y + i * lineHeight,
    );
  });

  // item image
  const itemImage = new Image();
  await new Promise(
    (r) => ((itemImage.onload = r), (itemImage.src = itemStore.image)),
  );
  const newSize = getNewSize(
    itemImage.width,
    itemImage.height,
    style.img.target,
  );
  const xOffset = (canvas.width - newSize.width) / 2;
  const yOffset = (canvas.height - newSize.height) / 2;
  ctx.drawImage(
    itemImage,
    xOffset - style.img.x,
    yOffset - style.img.y,
    newSize.width,
    newSize.height,
  );
};

const getNewSize = (width: number, height: number, target: number = 200) => {
  const ratio = width / height;
  let newWidth: number;
  let newHeight: number;
  if (ratio > 1) {
    newWidth = target;
    newHeight = target / ratio;
  } else {
    newHeight = target;
    newWidth = target * ratio;
  }
  return { width: newWidth, height: newHeight };
};

const downloadImage = () => {
  const canvas = document.getElementById('CnvImage') as HTMLCanvasElement;
  const image = canvas.toDataURL('image/jpeg');
  const a = document.createElement('a');
  a.href = image;
  const name = itemStore.name == '' ? 'untitled' : itemStore.name;
  a.download = `${name}.jpeg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const toggleButton = () => {
  const button = document.getElementById(
    'BtnDownloadImage',
  ) as HTMLInputElement;
  console.log(button.disabled);
  button.disabled = !button.disabled;
};

const handleDownload = async () => {
  toggleButton();

  await setItem();
  await createCanvas();
  downloadImage();

  toggleButton();
};

const bindItemEvents = () => {
  document
    .getElementById('BtnDownloadImage')!
    .addEventListener('click', handleDownload);
  document.getElementById('InpItemImage')!.addEventListener('change', () => {});
};

const init = () => {
  bindItemEvents();
};

init();

export default {};

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

const createCanvas = async () => {
  const canvas = document.getElementById('CnvImage') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // template Image
  const templateImage = new Image();
  await new Promise(
    (r) => ((templateImage.onload = r), (templateImage.src = template)),
  );
  ctx.drawImage(templateImage, 0, 0);

  const f =
    "url('https://cdn.jsdelivr.net/font-nanum/1.0/nanummyeongjo/v2/NanumMyeongjo-Regular.woff') format('woff')";
  const font = new FontFace('nanum', f);
  await font.load();
  // item name
  ctx.font = `32pt "나눔명조", "nanum myeongjo"`;
  ctx.fillStyle = 'white';
  ctx.fillText(itemStore.name, 50, 64);

  // item description
  ctx.font = `32pt "나눔명조", "nanum myeongjo"`;
  const lineHeight = 58;
  const lines = itemStore.description.split('\n');
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 50, 868 + i * lineHeight);
  }

  // item image
  const itemImage = new Image();
  await new Promise(
    (r) => ((itemImage.onload = r), (itemImage.src = itemStore.image)),
  );
  const newSize = getNewSize(itemImage.width, itemImage.height, 350);
  const xOffset = (canvas.width - newSize.width) / 2;
  const yOffset = newSize.height / 2;
  ctx.drawImage(
    itemImage,
    xOffset,
    450 - yOffset,
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

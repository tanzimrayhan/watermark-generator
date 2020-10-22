const Jimp = require("jimp");
const textToImage = require('text-to-image');

const fs=require('fs')
const text="Testing"


textToImage.generate(text).then(function (dataUri) {
  //console.log(dataUri.split(",")[1])
  var base64=dataUri.split(",")[1]
var ReadableData = require('stream').Readable
const imageBufferData = Buffer.from(base64, 'base64')
var streamObj = new ReadableData()
streamObj.push(imageBufferData)
streamObj.push(null)
streamObj.pipe(fs.createWriteStream('testImage.jpg'));
});
//const LOGO='F:\Image watermark generator\testImage.jpg'

const ORIGINAL_IMAGE =
  "https://avatars2.githubusercontent.com/u/23060689?v=4?height=180&width=180";

const LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Australian_Defence_Force_Academy_coat_of_arms.svg/1200px-Australian_Defence_Force_Academy_coat_of_arms.svg.png";

const LOGO_MARGIN_PERCENTAGE = 5;

const FILENAME = "test.jpg";

const main = async () => {
  const [image, logo] = await Promise.all([
    Jimp.read(ORIGINAL_IMAGE),
    Jimp.read("testImage.jpg")
  ]);

  
  logo.resize(image.bitmap.width / 10, Jimp.AUTO);

  const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
  const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

  const X = image.bitmap.width - logo.bitmap.width - xMargin;
  const Y = image.bitmap.height - logo.bitmap.height - yMargin;

  return image.composite(logo, X, Y, [
    {
      mode: Jimp.BLEND_SCREEN,
      opacitySource: 0.1,
      opacityDest: 1
    }
  ]);
};

main().then(image => image.write(FILENAME));
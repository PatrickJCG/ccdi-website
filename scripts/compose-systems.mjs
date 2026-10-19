import sharp from 'sharp';
import path from 'path';

const userUploadedDir = 'C:/Users/PatrickGalang/.gemini/antigravity-ide/brain/d07136f0-4db3-45a5-8a0b-1f8ab9b74cf2/.user_uploaded';
const brainDir = 'C:/Users/PatrickGalang/.gemini/antigravity-ide/brain/d07136f0-4db3-45a5-8a0b-1f8ab9b74cf2';
const outBroilerDir = 'public/images/broiler';

async function composeHeaters() {
  const bgPath = path.join(brainDir, 'broiler_heating_bg_1792040892693.jpg');
  const unlitHeaterPath = path.join(userUploadedDir, 'media_1792035790858.png');
  const litHeaterPath = path.join(userUploadedDir, 'media_1792035791052.png');

  // Background dimensions: target 1600 x 900 (16:9)
  const bgMeta = await sharp(bgPath).metadata();
  const targetW = 1600;
  const targetH = 900;

  // Resize and slightly blur/darken background for premium product isolation
  const bg = await sharp(bgPath)
    .resize(targetW, targetH, { fit: 'cover' })
    .modulate({ brightness: 0.85, saturation: 1.05 })
    .toBuffer();

  // Resize unlit heater
  const heaterH = 680;
  const unlitResized = await sharp(unlitHeaterPath)
    .resize({ height: heaterH, fit: 'inside' })
    .toBuffer();
  const unlitMeta = await sharp(unlitResized).metadata();

  // Resize lit heater
  const litResized = await sharp(litHeaterPath)
    .resize({ height: heaterH, fit: 'inside' })
    .toBuffer();
  const litMeta = await sharp(litResized).metadata();

  // Positioning: unlit on left, lit on right with comfortable margins
  const leftX = Math.round(targetW * 0.22 - (unlitMeta.width || 0) / 2);
  const rightX = Math.round(targetW * 0.72 - (litMeta.width || 0) / 2);
  const topY = Math.round((targetH - heaterH) / 2) + 20;

  await sharp(bg)
    .composite([
      {
        input: unlitResized,
        top: topY,
        left: Math.max(20, leftX),
      },
      {
        input: litResized,
        top: topY,
        left: Math.min(targetW - (litMeta.width || 0) - 20, rightX),
      },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(outBroilerDir, 'heating-system.jpg'));

  console.log('✓ Heaters composed successfully to heating-system.jpg');
}

async function composeFans() {
  const bgPath = path.join(brainDir, 'broiler_fan_bg_1792040928266.jpg');
  const fan1Path = path.join(userUploadedDir, 'media_1792035790746.png');
  const fan2Path = path.join(userUploadedDir, 'media_1792035790973.png');

  const targetW = 1600;
  const targetH = 900;

  const bg = await sharp(bgPath)
    .resize(targetW, targetH, { fit: 'cover' })
    .modulate({ brightness: 0.9 })
    .toBuffer();

  const fanH = 660;
  const fan1Resized = await sharp(fan1Path)
    .resize({ height: fanH, fit: 'inside' })
    .toBuffer();
  const fan1Meta = await sharp(fan1Resized).metadata();

  const fan2Resized = await sharp(fan2Path)
    .resize({ height: fanH, fit: 'inside' })
    .toBuffer();
  const fan2Meta = await sharp(fan2Resized).metadata();

  const leftX = Math.round(targetW * 0.25 - (fan1Meta.width || 0) / 2);
  const rightX = Math.round(targetW * 0.73 - (fan2Meta.width || 0) / 2);
  const topY = Math.round((targetH - fanH) / 2) + 25;

  await sharp(bg)
    .composite([
      {
        input: fan1Resized,
        top: topY,
        left: Math.max(30, leftX),
      },
      {
        input: fan2Resized,
        top: topY,
        left: Math.min(targetW - (fan2Meta.width || 0) - 30, rightX),
      },
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(outBroilerDir, 'ventilation-fans.jpg'));

  console.log('✓ Fans composed successfully to ventilation-fans.jpg');
}

async function run() {
  try {
    await composeHeaters();
    await composeFans();
  } catch (err) {
    console.error('Composition error:', err);
    process.exit(1);
  }
}

run();

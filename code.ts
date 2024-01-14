// In src/main.ts

figma.showUI(__html__);

// Function to fetch frames or images from the current page
function getFramesAndImages() {
  const nodes = figma.currentPage.children;
  const framesAndImages:any = [];

  nodes.forEach((node) => {
    // Check if the node is a frame or image
    if (node.type === 'FRAME' ) {
      framesAndImages.push(node);
    }
  });

  return framesAndImages;
}

// Function to download frames or images locally
// Function to download frames or images locally
async function downloadFramesAndImages(framesAndImages:any) {
  for (let index = 0; index < framesAndImages.length; index++) {
    const node = framesAndImages[index];
    const imageBytes = await node.exportAsync({ format: 'PNG' });

    // Save the image locally (you may customize the file name)
    const image:any = figma.createImage(imageBytes);
    const imageUrl = image['url'];
    const fileName = `frame_${index + 1}.png`;
      
    
    figma.ui.postMessage({ type: 'download', imageBytes, fileName });
  }
}

// Listen for messages from the UI
figma.ui.onmessage = (msg) => {
  
  if (msg.type === 'fetchFramesAndImages') {
    const framesAndImages = getFramesAndImages();
    downloadFramesAndImages(framesAndImages);
  }
};


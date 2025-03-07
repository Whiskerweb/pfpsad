export const downloadSvgAsPng = (svgElement: SVGSVGElement, fileName: string) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    console.error('Canvas context not available');
    return;
  }
  
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const img = new Image();
  
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    
    const imgURI = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = fileName;
    link.href = imgURI;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  img.src = url;
};
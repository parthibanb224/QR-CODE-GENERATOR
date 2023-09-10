import React, { useState } from 'react';
import './App.css'

function App() {
  const [data, setData] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [format, setFormat] = useState('');
  const [qrCodeColor, setQRCodeColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [codeColor, setCodeColor] = useState('')
  const [bgColor, setBgColor] = useState('');
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  const generateQRCode = () => {
    fetch(
      `http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${width}x${height}&format=${format}&color=${qrCodeColor}&bgcolor=${backgroundColor}`
    )
      .then((response) => {
        if (!response.ok) {
          console.log('Network response was not ok');
        }
        else{
          setQRCodeUrl(response.url)
        }
        return true;
      })
      .catch((error) => {
        console.log('Error generating QR code:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateQRCode();
    setData('');
    setWidth('');
    setHeight('');
    setCodeColor('');
    setBgColor('');
  }

  const handleDownload = () => {
    fetch(qrCodeUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `QR Code.${format.toLowerCase()}`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading QR code:', error);
      });
  };

  const hexToRgbForColor = (hex) => {
    setCodeColor(hex);
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    setQRCodeColor(`${r}-${g}-${b}`);
  };

  const hexToRgbForBgColor = (hex) => {
    setBgColor(hex);
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    setBackgroundColor(`${r}-${g}-${b}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full md:max-w-lg">
          <h1 className="text-3xl font-bold mb-4">QR Code Generator</h1>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Data:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter text"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-2 mb-4 md:mb-0">
              <label className="block font-semibold mb-1">Image Width:</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="md:w-1/2 md:pl-2">
              <label className="block font-semibold mb-1">Image Height:</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">QR Image Format:</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="PNG">PNG</option>
              <option value="JPG">JPG</option>
              <option value="SVG">SVG</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">QR Code Color:</label>
            <input
              type="color"
              id="foregroundColorInput"
              value={codeColor}
              onChange={(e) => hexToRgbForColor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Background Color:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => hexToRgbForBgColor(e.target.value)}
            />
          </div>
          <button
            type='submit'
            style={{backgroundColor:"blue"}}
            className="bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
          >
            Generate QR Code
          </button>
          {qrCodeUrl && (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold mb-2">Generated QR Code:</h2>
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto" />
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold mt-4 hover:bg-green-600 transition duration-300"
                onClick={handleDownload}
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;

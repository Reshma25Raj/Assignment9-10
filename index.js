document.addEventListener('DOMContentLoaded', function () {
  // Canvas setup
  const canvas = document.getElementById('main');
  const ctx = canvas.getContext('2d');
  let painting = false;

  // Brush color and size setup
  let brushColor = '#2979FF'; // Default to blue
  let brushSize = 5;

  // Event listeners for mouse movements
  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);

  // Event listeners for touch events
  canvas.addEventListener('touchstart', startPosition);
  canvas.addEventListener('touchend', endPosition);
  canvas.addEventListener('touchmove', draw);

  // Button and slider setup
  document.getElementById('black').addEventListener('click', () => setBrushColor('#000000'));
  document.getElementById('pink').addEventListener('click', () => setBrushColor('#F50057'));
  document.getElementById('blue').addEventListener('click', () => setBrushColor('#2979FF'));
  document.getElementById('yellow').addEventListener('click', () => setBrushColor('#FFD600'));
  document.getElementById('erase').addEventListener('click', () => setBrushColor('#ffffff')); // Eraser is white
  document.getElementById('new').addEventListener('click', clearCanvas);

  const slider = document.getElementById('slider');
  slider.addEventListener('input', updateBrushSize);

  // Functions
  function startPosition(e) {
    painting = true;
    draw(e); // Start drawing immediately on mousedown or touchstart
  }

  function endPosition() {
    painting = false;
    ctx.beginPath(); // Reset path when not drawing
  }

  function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    // Handle both mouse and touch events
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
  }

  function setBrushColor(color) {
    brushColor = color;
  }

  function updateBrushSize() {
    brushSize = slider.value;
    document.getElementById('brushSize').textContent = brushSize;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

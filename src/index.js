(function() {
  const box = document.getElementById("box");
  const container = document.getElementById("container");
  const boxRect = box.getBoundingClientRect();
  const sides = container.getBoundingClientRect();
  const maxX = sides.width - boxRect.width;
  const maxY = sides.height - boxRect.height;
  const minX = 0;
  const minY = 0;

  function handleMouseDown(event) {
    const shiftX = event.offsetX;
    const shiftY = event.offsetY;

    function handleMouseMove(event) {
      let x = event.clientX - sides.left - shiftX;
      let y = event.clientY - sides.top - shiftY;

      // Restrict the box inside the container
      x = x < minX ? minX : x > maxX ? maxX : x;
      y = y < minY ? minY : y > maxY ? maxY : y;

      box.style.left = x + "px";
      box.style.top = y + "px";
    }

    function handleMouseUp(event) {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  box.addEventListener("mousedown", handleMouseDown);
})();

(function() {
  const box = document.getElementById("box");
  const container = document.getElementById("container");

  function handleMouseDown(event) {
    const sides = container.getBoundingClientRect();
    const shiftX = event.offsetX;
    const shiftY = event.offsetY;

    function handleMouseMove(event) {
      box.style.left = event.clientX - sides.left - shiftX + "px";
      box.style.top = event.clientY - sides.top - shiftY + "px";
    }

    function handleMouseUp(event) {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  box.addEventListener("mousedown", handleMouseDown);
})();

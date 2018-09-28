/**
 * Simple Drag n Drop
 */
(function() {
  const box = document.querySelector(".box");
  const bin = document.querySelector(".bin");
  const container = document.querySelector(".container");

  const boxRect = box.getBoundingClientRect();
  const binRect = bin.getBoundingClientRect();
  const sides = container.getBoundingClientRect();

  function hasCollision(boxX, boxY) {
    const binX = bin.offsetLeft;
    const binY = bin.offsetTop;
    const binW = binRect.width;
    const binH = binRect.height;
    const boxW = boxRect.width;
    const boxH = boxRect.height;

    return !(
      boxX + boxW < binX ||
      boxX > binX + binW ||
      boxY + boxH < binY ||
      boxY > binY + binH
    );
  }

  function detectCollision(item, x, y) {
    if (hasCollision(x, y)) {
      item.classList.add("collide");
      bin.classList.add("collide");
    } else {
      item.classList.remove("collide");
      bin.classList.remove("collide");
    }
  }

  function handleMouseDown(event) {
    const shiftX = event.offsetX;
    const shiftY = event.offsetY;

    let item = box;
    if (event.shiftKey) {
      item = box.cloneNode();
      container.appendChild(item);
    }

    function handleMouseMove(event) {
      let x = event.pageX - sides.left - shiftX;
      let y = event.pageY - sides.top - shiftY;

      // Restrict the box inside the container
      const maxX = sides.width - boxRect.width;
      const maxY = sides.height - boxRect.height;
      const minX = 0;
      const minY = 0;

      x = x < minX ? minX : x > maxX ? maxX : x;
      y = y < minY ? minY : y > maxY ? maxY : y;

      item.style.left = x + "px";
      item.style.top = y + "px";

      detectCollision(item, x, y);
    }

    function handleMouseUp(event) {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  box.addEventListener("mousedown", handleMouseDown);
})();

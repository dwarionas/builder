interface HTMLElementWithMove extends HTMLElement {
    move(): void;
  }
  // @ts-ignore
  HTMLElement.prototype.move = function(this: HTMLElement) {
    const el = this;
  
    let currentDroppable: HTMLElement | null = null;
  
    el.onmousedown = function(event: MouseEvent) {
      let shiftX = event.clientX - el.getBoundingClientRect().left;
      let shiftY = event.clientY - el.getBoundingClientRect().top;
  
      el.style.position = 'absolute';
      el.style.zIndex = '1000';
      document.body.append(el);
  
      moveAt(event.pageX, event.pageY);
  
      function moveAt(pageX: number, pageY: number) {
        el.style.left = pageX - shiftX + 'px';
        el.style.top = pageY - shiftY + 'px';
      }
  
      function onMouseMove(event: MouseEvent) {
        moveAt(event.pageX, event.pageY);
  
        el.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
        el.hidden = false;
  
        if (!elemBelow) return;
  
        let droppableBelow = elemBelow.closest('.droppable') as HTMLElement;
        if (currentDroppable !== droppableBelow) {
          if (currentDroppable) {
            leaveDroppable(currentDroppable);
          }
          currentDroppable = droppableBelow;
          if (currentDroppable) {
            enterDroppable(currentDroppable);
          }
        }
      }
  
      document.addEventListener('mousemove', onMouseMove);
  
      el.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        el.onmouseup = null;
      };
    };
  
    el.ondragstart = function() {
      return false;
    };
  };
  
  function enterDroppable(elem: HTMLElement) {
    elem.style.background = 'pink';
  }
  
  function leaveDroppable(elem: HTMLElement) {
    elem.style.background = '';
  }
  
  // Використання:
  const ball = document.querySelector('.ball') as HTMLElementWithMove;
  ball.move();
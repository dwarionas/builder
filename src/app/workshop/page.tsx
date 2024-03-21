"use client"

import { MouseEvent, useState } from 'react';

const BallComponent: React.FC = () => {
  const [currentDroppable, setCurrentDroppable] = useState<HTMLElement | null>(null);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const ball = event.currentTarget;
    const shiftX = event.clientX - ball.getBoundingClientRect().left;
    const shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = '1000';
    document.body.appendChild(ball);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX: number, pageY: number) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);

      ball.hidden = true;
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;

      if (!elemBelow) return;

      const droppableBelow = elemBelow.closest('.droppable') as HTMLElement | null;
      if (currentDroppable !== droppableBelow) {
        if (currentDroppable) {
          leaveDroppable(currentDroppable);
        }
        setCurrentDroppable(droppableBelow);
        if (droppableBelow) {
          enterDroppable(droppableBelow);
        }
      }
    }
// @ts-ignore
    document.addEventListener('mousemove', onMouseMove);

    ball.onmouseup = () => { //@ts-ignore
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    };
  };

  const enterDroppable = (elem: HTMLElement) => {
    elem.style.background = 'pink';
  };

  const leaveDroppable = (elem: HTMLElement) => {
    elem.style.background = '';
  };

  const handleDragStart = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="ball"
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      style={{ width: '50px', height: '50px', backgroundColor: 'red' }}
    ></div>
  );
};

export default BallComponent;
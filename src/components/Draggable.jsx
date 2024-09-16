import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function Draggable(props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <li ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </li>
  );
}
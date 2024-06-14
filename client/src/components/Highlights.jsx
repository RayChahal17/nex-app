import React from 'react';
import EverVaultCardComponent from './ui/EverVaultCardComponent';

export default function Highlights({
   value,
   isHovered,  // Add prop to receive hover state
   setHoveredCardIndex,  // Add prop to set hover state
}) {
   const style = {
      color: isHovered ? '#20bf6b' : 'black', // Make the text color match the border
      transition: 'color 0.3s ease, box-shadow 0.3s ease',
      boxShadow: isHovered
         ? `
        0 0 2px rgba(255, 255, 255, 0.5),
        0 0 4px rgba(255, 255, 255, 0.5),
        0 0 6px rgba(255, 255, 255, 0.5),
        0 0 8px 1px #20bf6b,
        0 0 10px 1px #20bf6b,
        0 0 12px 1px #20bf6b,
        0 0 14px 1px #20bf6b
        `
         : 'none', // Extremely reduced glow effect
   };

   return (
      <div style={style}>
         <EverVaultCardComponent
            HeadingText={`${value}`}  // Display the hovered word
            isHovered={isHovered}  // Pass hover state
            setHoveredCardIndex={setHoveredCardIndex}  // Pass setter function
            index={0}  // Assuming single component, use 0 as index
         />
      </div>
   );
}

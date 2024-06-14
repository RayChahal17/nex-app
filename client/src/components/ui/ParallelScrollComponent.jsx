import React from 'react';
import ParallelScroll from '../ui/ParallelScroll';

const ParallaxScrollComponent = ({im1, im2, im3, im4, im5, im6, im7, im8, im9, im10,
   im11, im12, im13, im14, im15, im16, im17, im18, im19, im20,
   im21, im22, im23, im24, im25, im26, im27, im28, im29, im30,
   im31, im32, im33, im34, im35, im36, im37, im38, im39, im40}) => {
   const images = [im1, im2, im3, im4, im5, im6, im7, im8, im9, im10,
      im11, im12, im13, im14, im15, im16, im17, im18, im19, im20,
      im21, im22, im23, im24, im25, im26, im27, im28, im29, im30,
      im31, im32, im33, im34, im35, im36, im37, im38, im39, im40];
   return <ParallelScroll images={images} />;
};

export default ParallaxScrollComponent;

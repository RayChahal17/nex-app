import React from 'react'
import Wrapper from '../wrappers/OneReviewWrapper'

const OneReview = ({ reviewContent, reviewer, reviewerImage }) => {
   return (
      <Wrapper>
         <div className='container'>
            <div className='text_main'>
               <span> {reviewContent}
               </span>
            </div>
            <div className='image'>
               <div className='image__inside'>
                  <img src={reviewerImage} />
               </div>
            </div>
            <div className='name'>
               <span><b>{reviewer} </b></span>
            </div>
         </div>
      </Wrapper>
   )
}

export default OneReview

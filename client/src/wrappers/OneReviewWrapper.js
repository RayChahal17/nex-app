import styled, { css } from 'styled-components';


const Wrapper = styled.div`
.hidden{
   display: none;
}

.container{
   height: 60vh;
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: center;
}

.text_main{
   flex: 0 0 55%;
   width: 95%;
   font-size: 25px;
   font-weight: 100;
   font-style: italic;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
}
.text_main span{
align-self: flex-end;
}

.image{
   flex: 0 0 25%;
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: flex-end;
   align-items: center;

}

.name{
   padding: 15px 0 15px 0;
   flex: 0 0 20%;
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
}

.image__inside{
   position: relative;
width: 110px;
height: 110px;
border-radius: 100px;
/* transform: translateY(20%); */
border: 1px solid grey;
}
.image__inside img{
   object-fit: cover;
   overflow: hidden;
   width:100px; /*width of your image*/
   height:100px; /*height of your image*/
   border-radius: 100px;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   border: 1px solid grey;



}





@media screen and (max-width:1000px) {
  .sample__content-hidden {
    display: none;
  }
}



`
export default Wrapper;
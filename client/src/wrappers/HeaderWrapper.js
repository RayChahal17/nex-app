import styled from "styled-components";

const Wrapper = styled.div`

a {
   all: unset;
}

.logoWrapper{
   height: 100%;
   width: 150px;
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;
}

.logoWrapper img{
   padding-left: 10px;
   width: 90%;
   height: auto;
   cursor: pointer;
}

`;

export default Wrapper;

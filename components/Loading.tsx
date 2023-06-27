import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
  margin: 0 auto;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid rgb(52, 152, 219); /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 2s linear infinite;
`;

export default Loading;

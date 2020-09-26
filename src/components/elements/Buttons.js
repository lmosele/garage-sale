import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 20px;
  background-color: #333;
  color: white;
  &:disabled {
    background-color: gray;
  }
`;

export const ButtonLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #333;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

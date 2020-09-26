import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  margin-bottom: 15px;
  border: 0;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  &:focus {
    border-bottom: 1px solid #ccc;
  }
`;

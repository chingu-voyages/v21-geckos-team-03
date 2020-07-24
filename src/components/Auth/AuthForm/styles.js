import styled from 'styled-components';

// Marked for removal!!

export const FormContainer = styled.div``;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  justify-content: ${({ centered }) => (centered ? 'center' : 'space-around')};
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 1.6rem;
  }
`;

export const UserFormStyles = styled.div`
  margin: 6rem auto;
  padding: 6rem 2.4rem;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: var(--border-radius);
  box-shadow: var(shadow-low);

  .error-text {
    margin: 0.25em 0 0.5em 0;
    padding: 0;
    color: red;
    font-style: bold;
  }

  form {
    background-color: transparent;
    text-align: center;
    label {
      display: block;
      font-size: 1.4rem;
      padding: 2.4rem 4rem;
      font-weight: 500;
      color: ${({ theme }) => theme.textSecondary};
    }
    input {
      background-color: ${({ theme }) => theme.backgroundTop};
      outline: 0;
      border: 0;
      border-radius: 0.25rem;
      width: 100%;
      /* max-width: 400px; */
      margin: 1rem auto;
      padding: 1rem;
      color: ${({ theme }) => theme.textSecondary};
      font-family: 'Open Sans', sans-serif;
      font-size: 1.6rem;
      font-weight: 400;
      text-align: center;

      .error-input {
        border: 2px solid red;
        border-radius: 4px;
      }
    }
    button {
      background-image: ${({ theme }) => theme.gradient};
      font-family: Monaco;
      font-size: 16px;
      margin: 2rem auto;
      padding: 1rem 3rem;
      border-radius: 0.5rem;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 1rem 2rem rgba(var(--color-black), 0.2);
        &::after {
          transform: scaleX(1.4) scaleY(1.6);
          opacity: 0;
        }
      }
      &:active,
      &:focus {
        outline: none;
        transform: translateY(-1px);
        box-shadow: 0 0.5rem 1rem rgba(var(--color-black), 0.2);
      }
    }
  }
`;

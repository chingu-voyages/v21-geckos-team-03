import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4rem 2.4rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border-bottom: solid 1px ${({ theme }) => theme.primary};
  background: transparent;
  h1 {
    color: ${({ theme }) => theme.textPrimary};
    font-size: 2.4rem;
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
  ul {
    display: flex;
    li {
      font-size: 1.4rem;
    }
  }
  a {
    color: ${({ theme }) => theme.textSecondary};
    padding: 0.45rem;
    margin: 0 0.25rem;
    font-family: 'Space Mono';
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export { StyledNavbar as default };

import styled from 'styled-components';
import { grabMatchParams } from '../../.cache/find-path';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    label {
      display: grid;
      gap: 1rem;
      align-content: start;
    }
    label + label {
      margin-top: 1rem;
    }
    &.order,
    &.menu {
      grid-column: span 1;
      height: 600px;
    }
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
  .mapleSyrup {
    display: none;
  }
`;

export default OrderStyles;

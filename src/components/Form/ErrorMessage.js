//
// Error messages are components used to display specific error information related to a particular input field in a form.
//   When a user submits a form with invalid input, such as an invalid email address or a required field left blank,
//   error messages can be displayed near the corresponding input field
//   to indicate the error and provide guidance on how to correct it.

import styled from "styled-components";

const ErrorMessage = styled.span`
  color: #ff6961;
  padding: 6px 10px;
  max-width: 100%;
  font-size: 10px;
  overflow: hidden;
  align-self: flex-start;
`;

export default ErrorMessage;

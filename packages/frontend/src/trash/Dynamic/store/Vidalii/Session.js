// import React from 'react';
import PropTypes from 'prop-types';
import { html } from 'htm/react';
const Component = ({ user = {} }) =>
    html`<div>
    <h2>${user.name}</h2>
    <p>
      <a href=mailto: ${user.email}>
        ${user.email}
      </a>
    </p>
  </div>`

Component.config = {

}
// Component.defaultProps = {
//     name: 'Stranger'
// };
// Component.propTypes = {
//     user: PropTypes.object.isRequired,
// };

export default Component;
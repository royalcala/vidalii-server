import React from 'react'
import loadable from '@loadable/component'
import schema from '../schemas/session'
const Component = loadable(() => import(`../Installed/${schema.type}`))
export default () => React.createElement(Component, schema)
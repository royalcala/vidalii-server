import React from 'react'
import loadable from '@loadable/component'
import schema from '../schemas/session'
const Compo = loadable(() => import(`../Installed/${schema.type}`))
export default () => React.createElement(Compo, schema)
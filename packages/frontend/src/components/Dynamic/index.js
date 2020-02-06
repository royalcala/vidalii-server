import React from 'react'
import { createComponents } from "./createComponts";
const Dynamic = props => {
    console.log('Render Dynamic')
    const { schema } = props
    const [state, setState] = React.useState({ loading: true })

    React.useEffect(() => {
        const initComponents = async () => {
            const Components = await createComponents(schema)
            setState({ Components })
        }
        initComponents()
    }, []);

    if (state.loading)
        return <>
            <div>Im Child1..loading</div>
            <div>Im Child2...loading</div>
        </>
    else
        return state.Components
}
export default Dynamic

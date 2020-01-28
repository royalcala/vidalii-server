import React from 'react'

const formMutate = React.useMemo(props => {

    return <div>hola</div>
})
const FormMutate = React.useMemo(props => {
    console.log('props::', props)
    // const mutateData = props.mutateData
    // const [state, setState] = props.stateForm
    return (
        <div>
            <h3>Insert:</h3>
            <form
                onSubmit={async e => {
                    console.log('in submittedForm')
                    e.preventDefault();
                    let response = await mutateData({
                        variables: {
                            data: { ...state }
                        }
                    });
                    console.log('response::', response)
                    // setState(formState)
                    // const [s, set] = props.reloadFind
                    // set(s + 1)

                }}
            >
                _id:<input
                    value={state._id}
                    onChange={e => {
                        setState({ ...state, ...{ _id: e.target.value } })
                    }}
                />
                name:<input
                    value={state.name}
                    onChange={e => setState({ ...state, ...{ name: e.target.value } })}
                />

                <button type="submit">Add Material</button>
            </form>
        </div>
    )
}
)
export default formMutate

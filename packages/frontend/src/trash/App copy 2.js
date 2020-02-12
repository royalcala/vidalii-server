import React from 'react'
import Dynamic from './components/Dynamic'
const schema = {
  switchSession: {
    type: "material-ui/Box",
    children: {
      admin: {
        type: "material-ui/Button",
        // directives: ['query(gql,)', 'query(gql'],
        props: {
          variant: "contained",
          color: "primary"
        },
        children: {
          text: 'My text for material-ui/Button2'
        }
      },
      login: {
        type: "material-ui/Paper",
        // directives: ['query(gql,)', 'query(gql'],
        props: {
          variant: "contained",
          color: "primary"
        },
        children: {
          text: 'My text for material-ui/Button2'
        }
      },
    },
  },
  2: {
    type: "material-ui/Button",
    // directives: ['query(gql,)', 'query(gql'],
    props: {
      variant: "contained",
      color: "primary"
    },
    children: {
      text: 'My text for material-ui/Button2'
    }
  },
  3: {
    type: "material-ui/Button",
    // directives: ['query(gql,)', 'query(gql'],

    children: {
      text: 'My text for material-ui/Button2'
    }
  },
  4: {
    type: "material-ui/Button",
    // directives: ['query(gql,)', 'query(gql'],

    children: {
      text: 'My text for material-ui/Button2'
    }
  },
  5: {
    type: "material-ui/Button",
    // directives: ['query(gql,)', 'query(gql'],

    children: {
      text: 'My text for material-ui/Button2'
    }
  },

  // children: {
  //     idComponent2: {
  //         component: "Box",
  //         directive: [''],
  //         children: {
  //             idComponent3: {
  //                 component: "Input",
  //                 value: "Initial"
  //             }
  //         }
  //     }
  // }
}
const test2 = {
  a: 1,
  b: {
    a2: 1
  }
}

// const B = props => {
//   return <div>Im B</div>
// }
const A = props => {
  return <div>{props.text}</div>
}
const Compo1 = React.createElement(A, { text: 'HiW' })
// const Compo2 = React.createElement(module.default, { key, ...props }, children.text)
function App() {
  console.log('Render RootApp')
  // return Rao
  return (
    <>
      {/* {Compo1} */}
      <div>Login</div>
      <Dynamic schema={schema} {...test2} />
    </>
  )
}

export default App;

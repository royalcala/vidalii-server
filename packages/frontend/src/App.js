import React from 'react'
import Dynamic from './components/Dynamic'
const schema = {
  1: {
    component: "material-ui/Box",
    children: {
      11: {
        component: "material-ui/Button",
        // directives: ['query(gql,)', 'query(gql'],
        props: {
          variant: "contained",
          color: "primary"
        },
        children: {
          text: 'My text for material-ui/Button2'
        }
      },
      12: {
        component: "material-ui/Paper",
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
    component: "material-ui/Button",
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
    component: "material-ui/Button",
    // directives: ['query(gql,)', 'query(gql'],

    children: {
      text: 'My text for material-ui/Button2'
    }
  },
  4: {
    component: "material-ui/Button",
    // directives: ['query(gql,)', 'query(gql'],

    children: {
      text: 'My text for material-ui/Button2'
    }
  },
  5: {
    component: "material-ui/Button",
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
function App() {
  console.log('Render RootApp')
  // return Rao
  return (
    <>
      <div>Login</div>
      <Dynamic schema={schema} {...test2} />
    </>
  )
}

export default App;

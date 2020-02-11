export const schema = {
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
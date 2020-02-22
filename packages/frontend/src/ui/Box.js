import React from 'react';
import MuiBox from '@material-ui/core/Box';
// type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const addMedia = (store, oBreakPoint, breakPoint) => {
    if (oBreakPoint !== null) {
        Object.entries(oBreakPoint).forEach(
            ([key, value]) => {
                if (!store[key])
                    store[key] = {}
                store[key][breakPoint] = value
            }
        )
    }
}
const mediaQueries = otherProps => {
    const store = {}
    const { xs = null, sm = null, md = null, lg = null, xl = null,
        ...others } = otherProps
    addMedia(store, xs, 'xs')
    addMedia(store, sm, 'sm')
    addMedia(store, md, 'md')
    addMedia(store, lg, 'lg')
    addMedia(store, xl, 'xl')
    return {
        ...others,
        ...store
    }
}

const VidaliiBox = props => {
    const { children, ...otherProps } = props
    const queries = mediaQueries(otherProps)    
    return <MuiBox {...queries}>{children}</MuiBox>
    // return React.createElement(MuiBox, queries,children)
}

export default VidaliiBox
// import { styled } from '@material-ui/core/styles';
// import {
//     compose,
//     borders,
//     display,
//     flexbox,
//     grid,
//     palette,
//     positions,
//     shadows,
//     sizing,
//     spacing,
//     typography,
//     breakpoints
// } from '@material-ui/system';


// can't be inlined in the template string for proper type inference in TypeScript
// const styleFunction = breakpoints(typography);
// const Box = styled.div`
//   ${styleFunction}
// `;
// const Box = styled.div`
//   ${breakpoints(
//     compose(
//         borders,
//         display,
//         flexbox,
//         grid,
//         palette,
//         positions,
//         shadows,
//         sizing,
//         spacing,
//         typography,
//     ),
// )}
// `;

// export default Box



/**
 * Outputs:
 *
 * font-size: 12px;
 * @media (min-width: 600px) {
 *   font-size: 18px;
 * }
 * @media (min-width: 960px) {
 *   font-size: 24px;
 * }
 */
// export default function CollocationApi() {
//   return (
//     <Box xs={{ fontSize: 12 }} sm={{ fontSize: 18 }} md={{ fontSize: 24 }}>
//       Collocation API
//     </Box>
//   );
// }

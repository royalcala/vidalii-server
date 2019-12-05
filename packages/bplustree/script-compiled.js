"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tree = require("./tree");

var _put = require("./put");

// import noneLeaf from './noneLeaf'
// import leaf from './leaf'
// import { initTree } from './initTree'
const main = ({
  noneLeafMax = 3,
  leafMax = 3,
  comparatorSortFx = _tree.defaultComparatorFx
}) => {
  const tree = {
    noneLeafMax,
    leafMax,
    comparatorSortFx,
    firstNoneLeaf: null,
    lastLeaf: null,
    size: 0,
    countIdLeaf: 0,
    countIdNoneLeaf: 0,
    noneLeafs: {},
    leafs: {},
    store: {}
  };
  return {
    put: (key, value) => {
      return (0, _put.put)(tree)(key, value);
    },
    getTree: tree
  };
};

var _default = main;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initTree = void 0;
const initTree = {
  firstNoneLeaf: null,
  comparatorSortFx: null,
  size: 0,
  countIdLeaf: 0,
  countIdNoneLeaf: 0,
  noneLeafMax: 3,
  leafMax: 3,
  // first: 0,
  // last: null,
  noneLeafs: {},
  // 0: {
  //     blocks: [store[i]],
  //     parent: null,
  //     arrayPointers: {
  //         p0: '',
  //         p1: ''
  //     },
  //     type: 'noneleaf'
  // }
  leafs: {// 0: {
    //     blocks: [store[i]],
    //     parent: null,
    //     next: null,
    //     back: null,
    //     type: 'leaf'
    // }
  },
  store: {// key: {
    // key,
    // value
  }
};
exports.initTree = initTree;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectLeaf = exports.saveDataWithSelectLeaf = exports.createLeaf = void 0;

var _types = require("./types");

const createLeaf = state => {
  const {
    tree
  } = state;
  let nameNewLeaf = tree.countIdLeaf;
  tree.leafs[nameNewLeaf] = {
    blocks: [],
    parent: null,
    next: null,
    back: null,
    type: _types.LEAF
  };
  tree.countIdLeaf++;
  return state;
}; // const insertOrderedKey = (blocks, store) => {
//     let inserted = false
//     for (let i = blocks.length - 1; i > -1; i--) {
//         if (store.key > blocks[i]) {
//             // console.log('inserted on index:', i);
//             blocks.splice(i + 1, 0, store);
//             inserted = true
//             break;
//         }
//     }
//     if (inserted === false)
//         blocks.splice(0, 0, store);
// };


exports.createLeaf = createLeaf;

const saveDataWithSelectLeaf = state => {
  const {
    selectLeaf,
    tree,
    key,
    value
  } = state;
  selectLeaf.blocks.push(tree.store[key]);
  selectLeaf.blocks.sort(tree.comparatorSortFx); // insertOrderedKey(selectLeaf.blocks,tree.store[key])
  // for (i =  selectLeaf.blocks.length - 1; i > 0; i--) {
  // }

  return state;
};

exports.saveDataWithSelectLeaf = saveDataWithSelectLeaf;

const selectLeaf = ({
  byId = null,
  ByRefNode = null
}) => state => {
  const {
    tree
  } = state;
  state.selectLeaf = byId === null ? ByRefNode : tree.leafs[byId];
  return state;
};

exports.selectLeaf = selectLeaf;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRotateWithSelectLeaf = void 0;

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _leaf = require("./leaf");

var _noneLeaf = require("./noneLeaf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const divideLeaf = (Lleaf, tree) => {
  let Rleaf = (0, _pipe2.default)(_leaf.createLeaf, ({
    tree
  }) => {
    return tree.leafs[tree.countIdLeaf - 1];
  })({
    tree
  });
  Rleaf.next = Lleaf.next;
  Rleaf.back = Lleaf;
  Lleaf.next = Rleaf;
  if (Rleaf.next === null) tree.lastLeaf = Rleaf;
  let distribution = Lleaf.blocks.length / 2;
  Rleaf.blocks = Lleaf.blocks.splice(-Math.ceil(distribution));
  return Rleaf;
};

const rotateLeaf = state => {
  const {
    selectLeaf,
    tree
  } = state;
  state.Rleaf = divideLeaf(selectLeaf, tree);
  state.noneLeaf = (0, _noneLeaf.connectWithNoneLeaf)(selectLeaf, state.Rleaf, tree);
  return state;
};

const checkRotateWithSelectLeaf = (0, _ifElse2.default)(({
  selectLeaf,
  tree
}) => selectLeaf.blocks.length === tree.leafMax, rotateLeaf, state => state);
exports.checkRotateWithSelectLeaf = checkRotateWithSelectLeaf;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectWithNoneLeaf = exports.saveUpAndCheckRotate = void 0;

var _pathEq2 = _interopRequireDefault(require("ramda/src/pathEq"));

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _types = require("./types");

var _noneLeafRotate = require("./noneLeafRotate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveDataInUpNode = state => {
  const {
    nodeL,
    nodeR,
    tree
  } = state;
  state.selectNoneLeaf = nodeL.parent;
  nodeR.parent = state.selectNoneLeaf;
  if (nodeR.type === 'leaf') state.selectNoneLeaf.blocks.push(nodeR.blocks[0]);else state.selectNoneLeaf.blocks.push(nodeR.blocks.shift());
  state.selectNoneLeaf.blocksPointers.push(nodeR);
  return state;
};

const saveUpAndCheckRotate = (0, _pipe2.default)(saveDataInUpNode, _noneLeafRotate.checkRotateWithSelectNoneLeaf);
exports.saveUpAndCheckRotate = saveUpAndCheckRotate;

const createFirstNoneLeaf = state => {
  const {
    nodeL,
    nodeR,
    tree
  } = state;
  let newNoneLeaf = (0, _types.setNoneLeaf)(tree);
  if (nodeR.type === 'leaf') newNoneLeaf.blocks = [nodeR.blocks[0]];else newNoneLeaf.blocks = [nodeR.blocks.shift()];
  newNoneLeaf.blocksPointers = [nodeL, nodeR];
  nodeR.parent = newNoneLeaf;
  nodeL.parent = newNoneLeaf;
  tree.firstNoneLeaf = newNoneLeaf;
  return state;
};

const upNode = (0, _ifElse2.default)((0, _pathEq2.default)(['nodeL', 'parent'], null), createFirstNoneLeaf, saveUpAndCheckRotate);

const connectWithNoneLeaf = (Lleaf, Rleaf, tree) => upNode({
  nodeL: Lleaf,
  nodeR: Rleaf,
  tree
});

exports.connectWithNoneLeaf = connectWithNoneLeaf;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRotateWithSelectNoneLeaf = void 0;

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _types = require("./types");

var _noneLeaf = require("./noneLeaf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setBlocksPointers = state => {
  const {
    nodeL,
    nodeR
  } = state;
  let distribution = nodeL.blocksPointers.length / 2;
  nodeR.blocksPointers = nodeL.blocksPointers.splice(-Math.floor(distribution));
  return state;
};

const setBlocks = state => {
  const {
    nodeL,
    nodeR
  } = state;
  let distribution = nodeL.blocks.length / 2;
  nodeR.blocks = nodeL.blocks.splice(-Math.ceil(distribution));
  return state;
};

const reSelectNodes = state => {
  const {
    selectNoneLeaf,
    tree,
    nodeL: beforeL,
    nodeR: beforeR
  } = state;
  state.nodeL = selectNoneLeaf;
  state.nodeR = (0, _types.setNoneLeaf)(tree);
  beforeL.parent = state.nodeR;
  beforeR.parent = state.nodeR;
  return state;
};

const rotateNoneLeaf = (0, _pipe2.default)(reSelectNodes, setBlocks, setBlocksPointers, ({
  nodeL,
  nodeR,
  tree
}) => (0, _noneLeaf.connectWithNoneLeaf)(nodeL, nodeR, tree));
const checkRotateWithSelectNoneLeaf = (0, _ifElse2.default)(({
  selectNoneLeaf,
  tree
}) => selectNoneLeaf.blocks.length === tree.noneLeafMax, rotateNoneLeaf, state => state);
exports.checkRotateWithSelectNoneLeaf = checkRotateWithSelectNoneLeaf;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.put = exports.saveLeaf = void 0;

var _pathEq2 = _interopRequireDefault(require("ramda/src/pathEq"));

var _cond2 = _interopRequireDefault(require("ramda/src/cond"));

var _hasPath2 = _interopRequireDefault(require("ramda/src/hasPath"));

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _tree = require("./tree");

var _leaf = require("./leaf");

var _leafRotate = require("./leafRotate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveLeaf = (by = {}) => (0, _pipe2.default)(_tree.saveKeyValueInStore, (0, _leaf.selectLeaf)(by), _leaf.saveDataWithSelectLeaf, _leafRotate.checkRotateWithSelectLeaf);

exports.saveLeaf = saveLeaf;

const put = tree => (key, value) => (0, _ifElse2.default)((0, _hasPath2.default)(['tree', 'store', key]), ({
  tree
}) => {
  //replace
  tree.store[key] = value;
  return tree;
}, ({
  tree,
  key,
  value
}) => {
  //insert  
  let insert = (0, _cond2.default)([[({
    tree
  }) => tree.size >= tree.leafMax, (0, _pipe2.default)( // x => {
  //     console.time('moveToLeaf')
  //     return x
  // },
  (0, _tree.moveToLeaf)({
    nextNode: tree.firstNoneLeaf
  }), // x => {
  //     console.timeEnd('moveToLeaf')
  //     return x
  // },
  state => saveLeaf({
    ByRefNode: state.selectLeaf
  })(state))], [({
    tree
  }) => tree.size > 0, saveLeaf({
    byId: 0
  })], [(0, _pathEq2.default)(['tree', 'size'], 0), (0, _pipe2.default)(_tree.saveKeyValueInStore, _leaf.createLeaf, (0, _leaf.selectLeaf)({
    byId: 0
  }), _leaf.saveDataWithSelectLeaf)]])({
    tree,
    key,
    value
  });
  tree.size++;
  return insert;
})({
  tree,
  key,
  value
});

exports.put = put;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moveToLeaf = exports.saveKeyValueInStore = exports.incrementSizeTree = exports.defaultComparatorFx = void 0;

const defaultComparatorFx = (a, b) => {
  if (a.key > b.key) {
    return 1;
  }

  if (a.key < b.key) {
    return -1;
  } // a must be equal to b


  return 0;
};

exports.defaultComparatorFx = defaultComparatorFx;

const incrementSizeTree = state => {
  const {
    tree
  } = state;
  tree.size++;
  return state;
};

exports.incrementSizeTree = incrementSizeTree;

const saveKeyValueInStore = state => {
  const {
    key,
    value,
    tree
  } = state;
  tree.store[key] = {
    key,
    value
  };
  return state;
};

exports.saveKeyValueInStore = saveKeyValueInStore;

const moveToLeaf = ({
  nextNode
}) => state => {
  const {
    key,
    tree
  } = state; // let node = nextNode === null ? tree.noneLeafs[startInNoneLeaf] : nextNode

  let i; //CASE 1

  for (i = nextNode.blocks.length - 1; i > -1; i--) {
    if (key > nextNode.blocks[i].key) {
      nextNode = nextNode.blocksPointers[i + 1];
      if (nextNode.type === 'noneleaf') return moveToLeaf({
        nextNode
      })(state);else {
        state.selectLeaf = nextNode;
        return state;
      }
    }
  } // }
  //CASE 2
  //is less than all


  nextNode = nextNode.blocksPointers[0];
  if (nextNode.type === 'noneleaf') //and key < node.blocks[0].key esto es inferido
    return moveToLeaf({
      nextNode
    })(state);else {
    state.selectLeaf = nextNode;
    return state;
  }
};

exports.moveToLeaf = moveToLeaf;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNoneLeaf = exports.LEAF = exports.NONELEAF = void 0;
const NONELEAF = 'noneleaf';
exports.NONELEAF = NONELEAF;
const LEAF = 'leaf';
exports.LEAF = LEAF;

const setNoneLeaf = tree => {
  let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
    blocks: null,
    parent: null,
    blocksPointers: null,
    type: NONELEAF
  }; // tree.firstNoneLeaf = newNoneLeaf

  tree.countIdNoneLeaf++;
  return newNoneLeaf;
};

exports.setNoneLeaf = setNoneLeaf;

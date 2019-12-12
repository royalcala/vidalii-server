['db',
        // curryTopWithObject(
        //   ({ config }, { assoc_cond, cond_typedb }) => reduce(
        //     assoc_cond(cond_typedb),
        //     {}
        //   )(toPairs(config)),
        //   {
        //     assoc_cond: (cond_typedb) =>
        //       (acc, [tableName, tableConfig]) => assoc(
        //         tableName,
        //         cond_typedb({ tableName, tableConfig }),
        //         acc
        //       ),
        //     cond_typedb: cond([
        //       [() => true, () => '']
        //     ])
        //   }
        // )
        //composition
        // ({ config }) => compose(
        //   reduce(__, {}, toPairs(config.tables)),
        //   condition => (acc, [tableName, tableConfig]) => assoc(
        //     tableName,
        //     condition({ tableName, tableConfig }),
        //     acc
        //   ),
        //   cond
        // )([
        //   [() => true, () => '']
        // ])
        // curryTopWithFxs(
        //   ({ config }, assoc_cond, cond_typedb) =>
        //     reduce(
        //       assoc_cond(cond_typedb),
        //       {}
        //     )(toPairs(config.tables)),
        //   (cond_typedb) => (acc, [tableName, tableConfig]) =>
        //     assoc(
        //       tableName,
        //       cond_typedb
        //     ),
        //   (paramsOf_assoc_cond) => ''
        // )
        // evolComposeReturnTop(
        //   ['tables', ({ assoc_cond, config, }) =>
        //     reduce(
        //       assoc_cond,
        //       {},
        //       toPairs(config.tables)
        //     )
        //   ],
        //   ['assoc_cond', ({ cond_typeDB }) =>
        //     (acc, [tableName, tableConfig]) =>
        //       assoc
        //   ],

        // )
      ]
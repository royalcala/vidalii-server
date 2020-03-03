import {
    Not,
    LessThan,
    LessThanOrEqual,
    MoreThan,
    MoreThanOrEqual,
    Equal,
    Like,
    Between,
    In,
    Any,
    IsNull
} from "@orm";
const Filters = {
    Not,
    lessthan: LessThan,
    Lesstanorequal: LessThanOrEqual,
    Morethan: MoreThan,
    Morethanorequal: MoreThanOrEqual,
    Equal,
    Like,
    Between,
    In,
    Any,
    IsNull
}


const stadarizedName = name => {
    name = name.slice(1).toLowerCase()
    return name.charAt(0).toUpperCase() + name.slice(1)
}
export const applyFilters = ({ filter }) => {
    let key
    for (key in filter) {
        let value = filter[key]
        if (Array.isArray(value)) {
            if (typeof value[0] === 'object') {
                //is a where[] OR
                for (let index = 0; index < value.length; index++) {
                    applyFilters({ filter: value[index] })
                }
            }
            else if (value[0].charAt(0) === '$') {
                let FilterName = stadarizedName(value[0])
                if (value[1].charAt(0) === '$') {
                    let FilterName2 = stadarizedName(value[1])
                    filter[key] = Filters[FilterName](
                        Filters[FilterName2](value[2])
                    )
                } else
                    filter[key] = Filters[FilterName](value[1])
            }
        }
        else if (typeof value === 'object')
            applyFilters({ filter: value })
    }
}

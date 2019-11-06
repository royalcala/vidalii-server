import process from './process'

export default ({ db_encode_up, stateRev, stateSeq, standarizedResponse, crud_get }) => {

    return process({
        db_encode_up, stateRev,
        stateSeq, standarizedResponse,
        crud_get
    })

}

export default (res, filter) => {
    const r=res?.length!==0?res.map((o) => Object.fromEntries(filter.map(key => [key, o[key]]))):[];
    return r;
}
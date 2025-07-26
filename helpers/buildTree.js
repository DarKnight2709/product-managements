function buildTree(data, parent_id="")  {
  return data
    .filter((each => each.parent_id === parent_id))
    .map(each => ({
      parent: each,
      children: buildTree(data, each.id)
    }));
}


module.exports = (data) => {
  return buildTree(data)
}
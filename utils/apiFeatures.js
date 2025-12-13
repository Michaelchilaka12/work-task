
class APIFeatures{
    constructor(query, queryString){
    this.query = query
    this.queryString = queryString

}

filter() {
  const queryObj = { ...this.queryString };

  // 1) Remove excluded fields
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludedFields.forEach(el => delete queryObj[el]);

  // 2) Advanced filtering (gte, gt, lte, lt)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt)\b/g,
    match => `$${match}`
  );

  const parsedQuery = JSON.parse(queryStr);

  // 3) SEARCH (text fields)
  if (this.queryString.search) {
    parsedQuery.$or = [
      { name: { $regex: this.queryString.search, $options: 'i' } },
      { description: { $regex: this.queryString.search, $options: 'i' } }
    ];
  }

  this.query = this.query.find(parsedQuery);
  return this;
}
sort() {
  if (this.queryString.sort) {
    const sortBy = this.queryString.sort.split(',').join(' ');
    this.query = this.query.sort(sortBy);
  } else {
    this.query = this.query.sort('-createdAt');
  }
  return this;
}

}

module.exports = APIFeatures;
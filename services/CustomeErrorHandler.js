class CustomeErrorHandler extends Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  //Static ko call karne ke liye ke class ka object banane ki jarorat nhi hoti

  static alreadyExist(message) {
    return new CustomeErrorHandler(409, message);
  }
}

export default CustomeErrorHandler;

function chart(method){
  let res = null;
  switch (method) {
    case "GET":
      res = [ 80, 43, 53, 54, 76, 30] 
      break;
    default:
      res = null;  
  }
  return res;
}

module.exports = chart
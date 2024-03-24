function deduce(i, j, a, b) {
  // console.log({i, j}) 
  // base case
  if (i === 0) {
    console.log("return 1")
    return 1 
  }
  
  if (j === 0) {
    console.log("return 0")
    return 0
  }

  if (a[i-1] === b[j-1]) {
    console.log("match")
    return deduce(i-1, j-1, a, b) + deduce(i, j-1, a, b )
  } else {
    console.log("no match")
    return deduce(i, j-1, a, b)
  }
}

function getSubsequenceRecursive(a, b) {
  return deduce(a.length, b.length, a, b)
}

// const result = getSubsequenceRecursive("ABC", "ABCC")
// console.log({result})

module.exports = getSubsequenceRecursive

// ================= COLLECTION FUNCTIONS ================= 

// ----------------- myEach() -----------------

// Iterates over each element in the collection and applies a callback
function myEach(collection, callback) {
    if (Array.isArray(collection)) {
      // If collection is an array, iterate through each element
      for (let i = 0; i < collection.length; i++) {
        callback(collection[i], i, collection); // Apply callback to each element
      }
    } else {
      // If collection is an object, iterate through each key
      for (let key in collection) {
        callback(collection[key], key, collection); // Apply callback to each value
      }
    }
    return collection; // Return the original collection
  }

// ----------------- myMap() -----------------
  
  // Creates a new array by applying a callback to each element in the collection
  function myMap(collection, callback) {
    let newArray = [];
    if (Array.isArray(collection)) {
      // If collection is an array, iterate through each element
      for (let i = 0; i < collection.length; i++) {
        newArray.push(callback(collection[i], i, collection)); // Push transformed element to new array
      }
    } else {
      // If collection is an object, iterate through each key
      for (let key in collection) {
        newArray.push(callback(collection[key], key, collection)); // Push transformed value to new array
      }
    }
    return newArray; // Return the new array
  }

// ----------------- myReduce() -----------------
  
  // Reduces the collection to a single value using a callback and optional initial value
  function myReduce(collection, callback, acc) {
    // Determine starting index based on whether initial accumulator (acc) is provided
    let startingIndex = acc !== undefined ? 0 : 1;
    // Initialize accumulator based on collection type
    let accumulator = acc !== undefined ? acc : (Array.isArray(collection) ? collection[0] : collection[Object.keys(collection)[0]]);
    
    // Iterate over collection based on its type (array or object)
    if (Array.isArray(collection)) {
      for (let i = startingIndex; i < collection.length; i++) {
        accumulator = callback(accumulator, collection[i], i, collection); // Apply callback to each element
      }
    } else {
      let keys = Object.keys(collection);
      for (let i = startingIndex; i < keys.length; i++) {
        let key = keys[i];
        accumulator = callback(accumulator, collection[key], key, collection); // Apply callback to each value
      }
    }
    
    return accumulator; // Return the single value
  }

// ----------------- myFind() -----------------
  
  // Finds the first element in the collection that satisfies a predicate
  function myFind(collection, predicate) {
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) {
        return collection[i]; // Return the first element that satisfies the predicate
      }
    }
    return undefined; // Return undefined if no element satisfies the predicate
  }

// ----------------- myFilter() -----------------
  
  // Filters elements in the collection based on a predicate
  function myFilter(collection, predicate) {
    let newArray = [];
    for (let i = 0; i < collection.length; i++) {
      if (predicate(collection[i])) {
        newArray.push(collection[i]); // Add element to new array if it satisfies the predicate
      }
    }
    return newArray; // Return the new filtered array
  }

// ----------------- mySize() -----------------
  
  // Returns the number of values (length) in the collection
  function mySize(collection) {
    if (Array.isArray(collection)) {
      return collection.length; // Return the length of the array
    } else {
      return Object.keys(collection).length; // Return the number of keys in the object
    }
  }
  
// ================= ARRAY FUNCTIONS ================= 

//  ----------------- myFirst()  -----------------
  
  // Returns the first element of the array or the first n elements if n is provided
  function myFirst(array, n) {
    if (n === undefined) {
      return array[0]; // Return the first element of the array
    } else {
      return array.slice(0, n); // Return an array of the first n elements
    }
  }

//  ----------------- myLast()  -----------------
  
  // Returns the last element of the array or the last n elements if n is provided
  function myLast(array, n) {
    if (n === undefined) {
      return array[array.length - 1]; // Return the last element of the array
    } else {
      return array.slice(-n); // Return an array of the last n elements
    }
  }
  
// ================= OBJECT FUNCTIONS ================= 

//  ----------------- myKeys()  -----------------
  
  // Returns an array containing all enumerable property names of the object
  function myKeys(object) {
    return Object.keys(object); // Return an array of keys in the object
  }
  
//  ----------------- myValues()  -----------------

  // Returns an array containing all values of the object's properties
  function myValues(object) {
    return Object.values(object); // Return an array of values in the object
  }

// ================= BONUS FUNCTIONS ================= 


//  ----------------- mySortBy()  -----------------

  // Sorts an array in ascending order based on results of a callback function
  function mySortBy(array, callback) {
    return array.slice().sort((a, b) => {
      const aTransformed = callback(a); // Apply callback to element a
      const bTransformed = callback(b); // Apply callback to element b
      if (aTransformed < bTransformed) return -1; // Sort a before b
      if (aTransformed > bTransformed) return 1; // Sort b before a
      return 0; // Maintain order
    });
  }

//  ----------------- myFlatten()  -----------------

  // Flattens a nested array to a specified depth (or fully if depth is not provided)
  function myFlatten(array, shallow = false, newArr = []) {
    if (shallow) {
      return newArr.concat(...array); // Concatenate elements of array into newArr (shallow flattening)
    } else {
      for (let item of array) {
        if (Array.isArray(item)) {
          myFlatten(item, shallow, newArr); // Recursively flatten nested arrays
        } else {
          newArr.push(item); // Add non-array element to newArr
        }
      }
      return newArr; // Return fully flattened array
    }
  }
  
// ================= EXAMPLE OF HOW WE CAN CALL AND USE THE FUNCTIONS ================= 

  let exampleArray = [1, 2, 3, 4, 5];
  let exampleObject = { a: 1, b: 2, c: 3 };
  
  console.log(myEach(exampleArray, (elem) => console.log(elem))); // Logs each element in the array and returns [1, 2, 3, 4, 5]
  console.log(myMap(exampleArray, (elem) => elem * 2)); // Outputs [2, 4, 6, 8, 10]
  console.log(myReduce(exampleArray, (acc, elem) => acc + elem, 0)); // Outputs 15
  console.log(myFind(exampleArray, (elem) => elem > 3)); // Outputs 4
  console.log(myFilter(exampleArray, (elem) => elem % 2 === 0)); // Outputs [2, 4]
  console.log(mySize(exampleArray)); // Returns 5
  
  console.log(myFirst(exampleArray)); // Outputs 1
  console.log(myFirst(exampleArray, 3)); // Outputs [1, 2, 3]
  console.log(myLast(exampleArray)); // Outputs 5
  console.log(myLast(exampleArray, 3)); // Outputs [3, 4, 5]
  
  console.log(myKeys(exampleObject)); // Outputs ["a", "b", "c"]
  console.log(myValues(exampleObject)); // Outputs [1, 2, 3]
  
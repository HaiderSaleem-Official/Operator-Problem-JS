let nestedArray = [
    "OR",
    ["<", "a", "b"],
    ["AND", ["==", "c", "d"], ["!=", "e", "f"]],
  ];
  
  //METHOD 1:  OPERATOR PROBLEM WITH RECURSION
  
  function solve(arr) {
    if (!Array.isArray(arr)) {
      return arr;
    }
  
    let operator = arr[0];
    let newArr = [];
  
    for (let i = 1; i < arr.length; i++) {
      newArr.push(solve(arr[i]));
    }
    if (operator === "AND") {
      return ` (${newArr.join(operator)}) `;
    }
    return ` ${newArr.join(operator)} `;
  }
  
  //METHOD 2: OPERATOR PROBLEM WITH STACK
  
  function stack_sol(arr) {
    function process(arr) {
      const operatorStack = [];
      const operandStack = [];
  
      for (let element of arr) {
        if (Array.isArray(element)) {
          operandStack.push(`(${process(element)})`);
        } else if (["OR", "AND", "==", "!="].includes(element)) {
          operatorStack.push(element);
        } else {
          operandStack.push(element);
        }
      }
  
      while (operatorStack.length > 0) {
        const op2 = operandStack.pop();
        const op1 = operandStack.pop();
        const operator = operatorStack.shift();
  
        const expr = `${op1} ${operator} ${op2}`;
        operandStack.push(expr);
      }
  
      return operandStack[0];
    }
  
    const result = process(arr);
    console.log(result);
  }
  
  // MEHTOD 1
  const result = solve(nestedArray);
  console.log(result);
  
  // METHOD 2
  stack_sol(nestedArray);
  
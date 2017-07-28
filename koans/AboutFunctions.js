describe("About Functions", function() {

  it("should declare functions", function() {
    
    function add(a, b) {
      return a + b;
    }
    
    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";
    
    function getMessage() {
      return message;
    }
    
    function overrideMessage() {
      var message = "Inner";

      return message;
    }
    
    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer");
  });

  it("should have lexical scoping", function() {
    var variable = "top-level";

    function parentfunction() {
      var variable = "local";

      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");
  });

  it("should use lexical scoping to synthesise functions", function() {
    
    function makeIncreaseByFunction(increaseByAmount) {
      return function(numberToIncrease) {
        return numberToIncrease + increaseByAmount;
      };
    }
    
    var increaseBy3 = makeIncreaseByFunction(3);
    var increaseBy5 = makeIncreaseByFunction(5);
    
    expect(increaseBy3(10) + increaseBy5(10)).toBe(28);
  });

  it("should allow extra function arguments", function() {
    
    function returnFirstArg(firstArg) {
      return firstArg;
    }
    
    expect(returnFirstArg("first", "second", "third")).toBe("first");
    
    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }
    
    expect(returnSecondArg("only give first arg")).toBe(undefined);
    
    function returnAllArgs() {
      var argsArray = [];

      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
    }
    
    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third");
  });

  it("should pass functions as values", function() {
    var appendRules = function(name) {
      return name + " rules!";
    };
    
    var appendDoubleRules = function(name) {
      return name + " totally rules!";
    };
    
    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");
    
    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");
      
  });

  it("should use function body as a string", function() {
    var add = new Function("a", "b", "return a + b;");
    expect(add(1, 2)).toBe(3);
     
    var multiply = function(a, b) {
      // An internal comment
      return a * b;
    };

    // Passes with \r\n
    // Checked whitespace and expected/actual output appear identical in error message
     expect(multiply.toString()).toBe(
      "function (a, b) {\r\n" + 
      "      // An internal comment\r\n" + 
      "      return a * b;\r\n" + 
      "    }" );

    // Manually testing equality with \n only
    var a = multiply.toString();
    var b = "function (a, b) {\n" + 
      "      // An internal comment\n" + 
      "      return a * b;\n" + 
      "    }";

    console.log("a: " + a);
    console.log("b: " + b);

    // This logs false in KoansRunner but true when code block copied into new
    // chrome console
    console.log("a === b? " + (a === b)); 

    console.log(typeof a); 
    console.log(typeof b); 
    console.log(a.length); 
    console.log(b.length); 

    // mismatch at index 17; ASCII a: 13 ASCII b: 10
    for(var i = 0; i < b.length; i++) {
      if (a.charAt(i) !== b.charAt(i)) {
        console.log( "Mismatch at b index: " + i + ", a: " + a.charAt(i) + " and b: " + b.charAt(i) );
        console.log( "ASCII a: " + a.charCodeAt(i) + " ASCII b: " + b.charCodeAt(i) );
        console.log( "ASCII match?: " +  a.charCodeAt(i) === b.charCodeAt(i) );
        console.log("");

      }
    }

  });    
});
